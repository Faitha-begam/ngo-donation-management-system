import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Crosshair, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";

import { getCurrentUser, getUsers } from "../utils/auth";
import { createEmergencyRequest } from "../utils/emergencyStorage";
import { createNotification } from "../utils/notificationStorage";
import { INDIA_CENTER } from "../utils/emergencyMap";

const INITIAL_FORM_DATA = {
  title: "",
  category: "",
  description: "",
  location: "",
  urgency: "",
  helpType: "",
  amountRequired: "",
  requiredItems: "",
  latitude: "",
  longitude: "",
};

const FIELD_LABELS = {
  title: "Title",
  category: "Category",
  description: "Description",
  location: "Location",
  urgency: "Urgency",
  helpType: "Help type",
  amountRequired: "Amount required",
  requiredItems: "Required items",
  latitude: "Location pin",
  longitude: "Location pin",
};

export default function CreateEmergencyRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isGeocoding, setIsGeocoding] = useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    Object.entries(formData).forEach(([field, value]) => {
      if (!String(value).trim()) {
        nextErrors[field] = `${FIELD_LABELS[field]} is required.`;
      }
    });

    if (
      formData.amountRequired &&
      (Number(formData.amountRequired) <= 0 || Number.isNaN(Number(formData.amountRequired)))
    ) {
      nextErrors.amountRequired = "Enter a valid amount greater than zero.";
    }
    if (!formData.latitude || !formData.longitude || !Number.isFinite(Number(formData.latitude)) || !Number.isFinite(Number(formData.longitude))) nextErrors.latitude = "Choose a map location or use the city lookup.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const chooseCurrentLocation = () => {
    if (!navigator.geolocation) return toast.error("Location services are not available in this browser.");
    navigator.geolocation.getCurrentPosition(({ coords }) => { updateField("latitude", coords.latitude.toFixed(6)); updateField("longitude", coords.longitude.toFixed(6)); toast.success("Location pin added."); }, () => toast.error("Unable to access your location. You can choose a point on the map instead."), { enableHighAccuracy: true, timeout: 10000 });
  };
  const lookupLocation = async () => {
    if (!formData.location.trim()) return setErrors((current) => ({ ...current, location: "Enter a city or area before looking it up." }));
    setIsGeocoding(true);
    try { const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(formData.location)}`); const result = await response.json(); if (!result[0]) throw new Error("No match"); updateField("latitude", Number(result[0].lat).toFixed(6)); updateField("longitude", Number(result[0].lon).toFixed(6)); toast.success("Location found. You can fine-tune the pin on the map."); } catch { toast.error("We could not find that location. Please place the pin manually."); } finally { setIsGeocoding(false); }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const currentUser = getCurrentUser();

    if (!currentUser) {
      toast.error("Please login to create an emergency request.");
      navigate("/login", { replace: true });
      return;
    }

    const emergencyRequest = createEmergencyRequest({
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      location: formData.location.trim(),
      urgency: formData.urgency,
      helpType: formData.helpType,
      amountRequired: Number(formData.amountRequired),
      requiredItems: formData.requiredItems.trim(),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
    });

    const priorityByUrgency = {
      Critical: "critical",
      High: "high",
      Medium: "medium",
      Low: "medium",
    };

    getUsers()
      .filter((user) => String(user.id) !== String(currentUser.id))
      .forEach((user) => {
        createNotification({
          userId: user.id,
          requestId: emergencyRequest.id,
          title: "New Emergency Alert",
          message: `${emergencyRequest.title} needs help`,
          type: "emergency",
          priority: priorityByUrgency[emergencyRequest.urgency] || "medium",
        });
      });

    toast.success("Emergency request submitted successfully.");
    setFormData(INITIAL_FORM_DATA);
  };

  const fieldClassName = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-[#66785F] focus:ring-2 focus:ring-[#66785F]/20 ${
      errors[field] ? "border-red-500" : "border-[#DCCFC0]"
    }`;

  return (
    <main className="min-h-screen bg-[#FDF6ED] px-6 py-12">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#66785F]">
            Community emergency support
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#2E332B] md:text-4xl">
            Create an Emergency Request
          </h1>
          <p className="mt-3 text-gray-600">
            Share what your community needs so support can be coordinated quickly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#DCCFC0] bg-[#F8F6F1] p-6 shadow-sm md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <FormField label="Title" error={errors.title}>
              <input
                value={formData.title}
                onChange={(event) => updateField("title", event.target.value)}
                className={fieldClassName("title")}
                placeholder="e.g. Flood relief for Riverside"
              />
            </FormField>

            <FormField label="Category" error={errors.category}>
              <select
                value={formData.category}
                onChange={(event) => updateField("category", event.target.value)}
                className={fieldClassName("category")}
              >
                <option value="">Select a category</option>
                <option value="Natural disaster">Natural disaster</option>
                <option value="Medical emergency">Medical emergency</option>
                <option value="Food security">Food security</option>
                <option value="Shelter">Shelter</option>
                <option value="Other">Other</option>
              </select>
            </FormField>

            <FormField label="Location" error={errors.location}>
              <div className="flex gap-2"><input value={formData.location} onChange={(event) => updateField("location", event.target.value)} className={fieldClassName("location")} placeholder="City, area, or community" /><button type="button" onClick={lookupLocation} disabled={isGeocoding} className="shrink-0 rounded-xl bg-[#66785F] px-3 text-xs font-bold text-white disabled:opacity-60">{isGeocoding ? "Finding…" : "Find pin"}</button></div>
            </FormField>

            <FormField label="Urgency" error={errors.urgency}>
              <select
                value={formData.urgency}
                onChange={(event) => updateField("urgency", event.target.value)}
                className={fieldClassName("urgency")}
              >
                <option value="">Select urgency</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </FormField>

            <FormField label="Help Type" error={errors.helpType}>
              <select
                value={formData.helpType}
                onChange={(event) => updateField("helpType", event.target.value)}
                className={fieldClassName("helpType")}
              >
                <option value="">Select help type</option>
                <option value="Financial support">Financial support</option>
                <option value="Material support">Material support</option>
                <option value="Volunteer support">Volunteer support</option>
                <option value="Mixed support">Mixed support</option>
              </select>
            </FormField>

            <FormField label="Amount Required (₹)" error={errors.amountRequired}>
              <input
                type="number"
                min="1"
                value={formData.amountRequired}
                onChange={(event) => updateField("amountRequired", event.target.value)}
                className={fieldClassName("amountRequired")}
                placeholder="0"
              />
            </FormField>
          </div>

          <div className="mt-6 grid gap-6">
            <FormField label="Emergency location pin" error={errors.latitude}>
              <div className="overflow-hidden rounded-2xl border border-[#DCCFC0] bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0E7DB] p-3"><p className="text-xs text-gray-600">Click the map to place an exact pin. Your written location remains visible to everyone.</p><button type="button" onClick={chooseCurrentLocation} className="inline-flex items-center gap-1 rounded-full border border-[#66785F] px-3 py-1.5 text-xs font-bold text-[#66785F]"><Crosshair className="h-3.5 w-3.5" />Use my location</button></div><LocationPicker latitude={formData.latitude} longitude={formData.longitude} onChange={(lat, lng) => { updateField("latitude", lat.toFixed(6)); updateField("longitude", lng.toFixed(6)); }} /><p className="flex items-center gap-1 p-3 text-xs text-gray-500"><MapPin className="h-3.5 w-3.5" />{formData.latitude ? `${formData.latitude}, ${formData.longitude}` : "No pin selected"}</p></div>
            </FormField>
            <FormField label="Description" error={errors.description}>
              <textarea
                rows="5"
                value={formData.description}
                onChange={(event) => updateField("description", event.target.value)}
                className={fieldClassName("description")}
                placeholder="Explain the emergency and who needs support."
              />
            </FormField>

            <FormField label="Required Items" error={errors.requiredItems}>
              <textarea
                rows="3"
                value={formData.requiredItems}
                onChange={(event) => updateField("requiredItems", event.target.value)}
                className={fieldClassName("requiredItems")}
                placeholder="e.g. Drinking water, blankets, first-aid supplies"
              />
            </FormField>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-[#66785F] px-6 py-4 font-semibold text-white transition hover:bg-[#2E332B]"
          >
            Submit Emergency Request
          </button>
        </form>
      </section>
    </main>
  );
}

function FormField({ label, error, children }) {
  return (
    <label className="block text-sm font-medium text-[#2E332B]">
      {label}
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </label>
  );
}

function LocationPicker({ latitude, longitude, onChange }) {
  const position = latitude && longitude ? [Number(latitude), Number(longitude)] : INDIA_CENTER;
  const pinIcon = L.divIcon({ className: "hope-map-marker", html: '<span style="background:#66785F"></span>', iconSize: [26, 26], iconAnchor: [13, 13] });
  function ClickHandler() { useMapEvents({ click(event) { onChange(event.latlng.lat, event.latlng.lng); } }); return null; }
  return <MapContainer center={position} zoom={latitude ? 12 : 5} className="h-64 w-full" scrollWheelZoom><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><ClickHandler />{latitude && longitude && <Marker position={position} icon={pinIcon} />}</MapContainer>;
}
