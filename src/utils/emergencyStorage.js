import { getUsers } from "./auth";
import { createNotification } from "./notificationStorage";

const EMERGENCY_REQUESTS_KEY = "emergencyRequests";
const now = () => new Date().toISOString();
const event = (action, date = now()) => ({ action, date });
const id = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// Normalizing on every read keeps requests saved before the case-management upgrade usable.
const normalizeRequest = (request) => ({
  ...request,
  latitude: request.latitude ?? null,
  longitude: request.longitude ?? null,
  evidencePhotos: Array.isArray(request.evidencePhotos) ? request.evidencePhotos : [],
  supportingDescription: request.supportingDescription || "",
  peopleAffected: Number(request.peopleAffected || 0),
  emergencyContact: request.emergencyContact || { name: "", phone: "" },
  landmark: request.landmark || "",
  needBy: request.needBy || "",
  videoLink: request.videoLink || "",
  verificationNotes: Array.isArray(request.verificationNotes) ? request.verificationNotes : [],
  rejectionReason: request.rejectionReason || "",
  updates: Array.isArray(request.updates) ? request.updates : [],
  comments: Array.isArray(request.comments) ? request.comments : [],
  timeline: Array.isArray(request.timeline) && request.timeline.length ? request.timeline : [event("Emergency request created", request.createdAt || now())],
  supporters: Array.isArray(request.supporters) ? request.supporters : [],
  fundingMilestones: Array.isArray(request.fundingMilestones) ? request.fundingMilestones : [],
});

const getStoredRequests = () => { try { const requests = JSON.parse(localStorage.getItem(EMERGENCY_REQUESTS_KEY)); return Array.isArray(requests) ? requests.map(normalizeRequest) : []; } catch { return []; } };
const saveEmergencyRequests = (requests) => { localStorage.setItem(EMERGENCY_REQUESTS_KEY, JSON.stringify(requests)); window.dispatchEvent(new Event("emergencyRequestsUpdated")); };
const priorityByUrgency = { Critical: "critical", High: "high", Medium: "medium", Low: "medium" };
const notify = (userId, request, title, message) => createNotification({ userId, requestId: request.id, title, message, type: "emergency", priority: priorityByUrgency[request.urgency] || "medium" });
const notifyCreator = (request, title, message) => notify(request.creatorId, request, title, message);

export const createEmergencyRequest = (requestData) => {
  const createdAt = now();
  const request = normalizeRequest({ id: `emergency-${Date.now()}`, ...requestData, status: "pending", supporters: [], createdAt, timeline: [event("Emergency request created", createdAt), ...(requestData.evidencePhotos?.length ? [event("Evidence photos uploaded", createdAt)] : [])] });
  const requests = getStoredRequests(); requests.push(request); saveEmergencyRequests(requests); return request;
};
export const getEmergencyRequests = () => getStoredRequests();
export const getEmergencyById = (requestId) => getStoredRequests().find((request) => request.id === requestId) || null;
export const getPendingEmergencyRequests = () => getStoredRequests().filter((request) => request.status === "pending");
export const updateEmergencyRequest = (requestId, updates) => { const requests = getStoredRequests(); const index = requests.findIndex((request) => request.id === requestId); if (index < 0) return null; requests[index] = normalizeRequest({ ...requests[index], ...updates, id: requests[index].id }); saveEmergencyRequests(requests); return requests[index]; };
export const deleteEmergencyRequest = (requestId) => { const requests = getStoredRequests(); const next = requests.filter((request) => request.id !== requestId); if (next.length === requests.length) return false; saveEmergencyRequests(next); return true; };
export const appendEmergencyTimeline = (requestId, action) => { const request = getEmergencyById(requestId); return request && updateEmergencyRequest(requestId, { timeline: [...request.timeline, event(action)] }); };

export const addSupportToEmergencyRequest = (requestId, supportData) => {
  const request = getEmergencyById(requestId); if (!request) return null;
  const supportId = supportData.id || id("support");
  if (request.supporters.some((support) => support.id === supportId)) return request;
  const supporter = { id: supportId, userId: supportData.userId, userName: supportData.userName, supportType: supportData.supportType, amount: supportData.supportType === "money" ? Number(supportData.amount || 0) : null, items: supportData.supportType === "item" ? supportData.items || null : null, message: supportData.message || "", createdAt: now() };
  const supporters = [...request.supporters, supporter];
  const collected = supporters.reduce((sum, support) => sum + (support.supportType === "money" ? Number(support.amount || 0) : 0), 0);
  const progress = request.amountRequired ? (collected / Number(request.amountRequired)) * 100 : 0;
  const milestones = [25, 50, 75, 100].filter((mark) => progress >= mark && !request.fundingMilestones.includes(mark));
  const updated = updateEmergencyRequest(requestId, { supporters, fundingMilestones: [...request.fundingMilestones, ...milestones], timeline: [...request.timeline, event(`${supporter.userName} supported this emergency`), ...milestones.map((mark) => event(`Funding reached ${mark}%`))] });
  milestones.forEach((mark) => notifyCreator(updated, "Funding milestone reached", `${updated.title} has reached ${mark}% of its funding goal.`));
  return updated;
};

const updateStatus = (requestId, status, action, extra = {}) => { const request = getEmergencyById(requestId); if (!request) return null; return updateEmergencyRequest(requestId, { ...extra, status, timeline: [...request.timeline, event(action)] }); };
export const verifyEmergencyRequest = (id) => { const request = updateStatus(id, "verified", "Emergency request approved by admin"); if (request) notifyCreator(request, "Emergency request approved", `${request.title} is verified and ready to receive support.`); return request; };
export const rejectEmergencyRequest = (id, rejectionReason = "") => { const request = updateStatus(id, "rejected", "Emergency request rejected by admin", { rejectionReason }); if (request) notifyCreator(request, "Emergency request rejected", rejectionReason || `Your request “${request.title}” was not approved.`); return request; };
export const activateEmergencyRequest = (id) => { const request = updateStatus(id, "active", "Emergency request marked active by admin"); if (request) notifyCreator(request, "Emergency request is active", `${request.title} is now actively being coordinated.`); return request; };
export const completeEmergencyRequest = (id) => { const request = updateStatus(id, "completed", "Emergency request marked completed by admin"); if (request) { notifyCreator(request, "Emergency request completed", `${request.title} has been marked completed.`); [...new Set(request.supporters.map((supporter) => supporter.userId))].forEach((userId) => notify(userId, request, "Emergency request completed", `Thank you for helping with ${request.title}.`)); } return request; };
export const requestEmergencyInformation = (id, message) => { const request = getEmergencyById(id); if (!request) return null; const note = { id: idForNote(), author: "Admin", message, createdAt: now() }; const updated = updateEmergencyRequest(id, { verificationNotes: [...request.verificationNotes, note], timeline: [...request.timeline, event("Additional information requested by admin")] }); notifyCreator(updated, "Additional information requested", message || `Please provide more information for ${updated.title}.`); return updated; };
const idForNote = () => id("note");
export const addVerificationNote = (id, message, author = "Admin") => { const request = getEmergencyById(id); if (!request || !message.trim()) return null; return updateEmergencyRequest(id, { verificationNotes: [...request.verificationNotes, { id: idForNote(), author, message: message.trim(), createdAt: now() }], timeline: [...request.timeline, event("Admin verification note added")] }); };

export const addEmergencyUpdate = (id, updateData) => { const request = getEmergencyById(id); if (!request) return null; const update = { id: idForNote(), creatorId: updateData.creatorId, creator: updateData.creator, message: updateData.message.trim(), image: updateData.image || "", pinned: false, createdAt: now() }; const updated = updateEmergencyRequest(id, { updates: [...request.updates, update], timeline: [...request.timeline, event("New emergency update posted")] }); getUsers().filter((user) => String(user.id) !== String(update.creatorId)).forEach((user) => notify(user.id, updated, "Emergency update", `${updated.title}: ${update.message}`)); return updated; };
export const toggleEmergencyUpdatePin = (id, updateId) => { const request = getEmergencyById(id); if (!request) return null; return updateEmergencyRequest(id, { updates: request.updates.map((update) => update.id === updateId ? { ...update, pinned: !update.pinned } : update), timeline: [...request.timeline, event("Emergency update pin status changed")] }); };

export const addEmergencyComment = (id, commentData, parentId = null) => { const request = getEmergencyById(id); if (!request || !commentData.message.trim()) return null; const comment = { id: idForNote(), userId: commentData.userId, userName: commentData.userName, badge: commentData.badge || "", message: commentData.message.trim(), parentId, hidden: false, createdAt: now() }; const updated = updateEmergencyRequest(id, { comments: [...request.comments, comment], timeline: [...request.timeline, event(parentId ? "New reply posted" : "New encouraging comment posted")] }); const recipient = parentId ? request.comments.find((item) => item.id === parentId)?.userId : request.creatorId; if (recipient && String(recipient) !== String(comment.userId)) notify(recipient, updated, parentId ? "New reply" : "New comment", `${comment.userName}: ${comment.message}`); return updated; };
export const moderateEmergencyComment = (id, commentId, mode) => { const request = getEmergencyById(id); if (!request) return null; const comments = mode === "delete" ? request.comments.filter((comment) => comment.id !== commentId && comment.parentId !== commentId) : request.comments.map((comment) => comment.id === commentId ? { ...comment, hidden: !comment.hidden } : comment); return updateEmergencyRequest(id, { comments, timeline: [...request.timeline, event(`Comment ${mode === "delete" ? "deleted" : "visibility changed"} by admin`)] }); };
