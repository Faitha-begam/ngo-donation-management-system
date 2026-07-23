import banner from '../assets/banner.png'
const Hero = () => {
  return (
    <>
      <div>
        <img className='w-full min-h-screen bg-cover bg-center' alt=""  style={{ backgroundImage: `url(${banner})` }}/>
      </div>
    </>
  )
}

export default Hero
