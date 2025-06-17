import { useState,useRef, useEffect } from 'react'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [github, setGithub] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [imageErrorMessage, setImageErrorMessage] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImageUrl(objectUrl); 
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageUrl(null);
    }
  }, [selectedImage]);

  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  const handleNameGithubInput = (e) => {
    setGithub(e.target.value);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailFormatValid = (emailString) => {
    return emailRegex.test(emailString.trim());
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setEmailErrorMessage(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setImageErrorMessage(false);
    } else {
      setSelectedImage (null);
      setImageErrorMessage(true);
    }
  }

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImageErrorMessage(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const isEmailValid = isEmailFormatValid(email); 

    if (!isEmailValid) {
      setEmailErrorMessage(true);
      formIsValid = false;
    } else {
      setEmailErrorMessage(false);
    }

    if (!selectedImage) {
      setImageErrorMessage(true);
      formIsValid= false;
    } else {
      setImageErrorMessage(false);
    }

    if(formIsValid) {
      setEmailErrorMessage(false);
      setImageErrorMessage(false);

      setFormSubmitted(true);
    }
  };

  const backToForm = () => {
    setFormSubmitted(false);
    setName('');
    setEmail('');
    setGithub('');
    setImageUrl(null);
  }

  return (
    <>
      {formSubmitted ? (
        <div className='container'>
          <img 
          src="assets/images/logo-full.svg" 
          alt="logo"
          className='mx-auto w-3/5 sm:max-w-1/2 lg:max-w-1/4'
          />
          <h1 className='text-3xl mt-8 font-bold text-center sm:max-w-3/4 sm:text-4xl sm:mx-auto lg:text-6xl lg:max-w-3/5 lg:mt-16'>
            Congrats 
            <span className='gradient'> {name}</span>
            ! Your ticket is ready. 
          </h1>
          <h2 className='text-center my-6 text-[1.2rem]/7 font-normal text-Neutral300 sm:max-w-1/2 sm:text-xl sm:mx-auto lg:text-2xl lg:max-w-1/3'>
            We've emailed your ticket to 
            <span className='text-Orange500'> {email}</span> 
            and will send the updates in the run up to the event.
          </h2>

          <div className='relative flex mt-16 ax-w-md justify-self-center sm:mt-20'>
            <img className='absolute w-full left-0 top-0' src="assets/images/pattern-ticket.svg" alt="pattern-ticket"/>
            <div className='p-4 px-5 sm:p-7 sm:px-8'>
              <div className='flex gap-3 mb-6 sm:mb-10 lg:mb-12'>
                <img className='w-1/7 mb-2 sm:w-1/9 sm:mb-4' src="assets/images/logo-mark.svg" alt="logo-mark"/>
                <div>
                  <p className='text-2xl font-semibold sm:text-3xl'>Coding Conf</p>
                  <p className='text-Neutral300 text-sm w-full text-center sm:text-base sm:mt-1'>Jan 31, 2025 / Austin, TX</p>
                </div>
              </div>

              <div className='flex gap-3 items-center'>
                <img
                  className='w-1/5 rounded-lg' 
                  src={imageUrl} 
                  alt="Uploaded-Image-Preview" 
                />
                <div className='flex flex-col gap-1'>
                  <p className='text-lg font-semibold sm:text-2xl'>{name}</p>
                  <p className='flex items-center text-Neutral300 text-sm sm:text-xl'><img src="assets/images/icon-github.svg" alt="icon-github" />{github}</p>
                </div>
              </div>
            </div>
            <p className='p-2 rotate-90 content-center text-Neutral300 sm:text-2xl'>#01609</p>
          </div>
          
        </div>
      ) : (
        <div className='container'>
        <img 
          src="assets/images/logo-full.svg" 
          alt="logo"
          className='mx-auto w-3/5 sm:max-w-1/2 lg:max-w-1/5'
        />
        <h1 className='text-[1.6rem]/9 mt-8 font-bold text-center sm:max-w-3/4 sm:text-4xl sm:mx-auto lg:text-5xl lg:max-w-2/3 lg:mt-10'>
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
        <h2 className='text-lg text-Neutral300 mt-4 font-semibold text-center sm:max-w-2/3 sm:text-xl sm:mx-auto lg:text-xl lg:mt-6'>
          Secure your spot at next year's biggest coding conference.
        </h2>

        <form 
          className='mt-6 max-w-md mx-auto lg:mt-12' 
          onSubmit={handleSubmit} 
          noValidate
        >
          <span className='text-xl text-Neutral300'>Upload Avatar</span>
          {imageUrl ? (
            <div className='grid bg-Neutral700/30 border-2 border-dashed border-Neutral300/45 p-2.5 rounded-xl justify-items-center mt-2 mb-3'>
              <img
                className='border border-Neutral300/75 w-1/6 rounded-2xl m-4' 
                src={imageUrl} 
                alt="Uploaded-Avatar-Preview" 
              />
              <div className='flex gap-3 mb-4 mt-1'>
                <button
                  type='button'
                  className='bg-Neutral700 text-Neutral300 text-sm rounded-md p-0.5 px-2'
                  onClick={removeImage}>Remove Image
                </button>

                <label
                  className='bg-Neutral700 text-Neutral300 text-sm rounded-md p-0.5 px-2' 
                  htmlFor="Avatar"
                > Change Image
                <input 
                  className='hidden' 
                  type="file" 
                  name="Upload-Avatar" 
                  id="Avatar"
                  accept='image/*'
                  onChange={handleFileChange}
                /></label>
              </div>
            </div>
          ) : (
            <label htmlFor="Avatar"> 
              <div className='grid bg-Neutral700/30 border-2 border-dashed border-Neutral300/45 p-2.5 rounded-xl justify-items-center mt-2 mb-3
               hover:bg-Neutral700/75 cursor-pointer'>
              <img
                className='p-2 border border-Neutral300/50 bg-Neutral300/20 rounded-xl m-4' 
                src="assets/images/icon-upload.svg" 
                alt="icon-upload" 
              />
              <input 
                className='hidden' 
                type="file" 
                name="Upload-Avatar" 
                id="Avatar"
                accept='image/*'
                onChange={handleFileChange}
              />
            
              <p className='text-lg font-light text-Neutral300 mt-1 mb-2'>Drag and drop or click to upload</p>
            </div>
          </label>
          )}
          
          <div className='flex gap-2 mb-3 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke={`${imageErrorMessage ? '#EBA589' : '#D1D0D5'}`} strokeLinecap="round" strokeLinejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke={`${imageErrorMessage ? '#EBA589' : '#D1D0D5'}`} strokeLinecap="round" strokeLinejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg>
            <p className={`${imageErrorMessage ? 'text-Orange700/65 font-' : 'text-Neutral500'} text-[0.8rem] font-bold`}>Upload your photo (JPG or PNG, max size: 500KB).</p>
          </div>
          
          <label className='text-xl text-Neutral300' htmlFor="full-name">Full Name
            <input 
              className='w-full border text-Neutral300 text-2xl border-Neutral300 rounded-xl bg-Neutral700/30 mt-2 mb-5 p-3 pl-5 
              focus:border-4 focus:outline-Neutral900 hover:bg-Neutral700/75 cursor-pointer' 
              type="text" 
              name='full-name' 
              id='full-name' 
              value={name}
              onChange={handleNameInput}
            />
          </label>

          <label className='text-xl text-Neutral300' htmlFor="email">Email
            <input 
              className='w-full border text-Neutral300 text-2xl border-Neutral300 rounded-xl bg-Neutral700/30 mt-2 mb-5 p-3 pl-5 
              focus:border-4 focus:outline-Neutral900 hover:bg-Neutral700/75 cursor-pointer' 
              type="email" 
              name='email' 
              id='email' 
              placeholder='example@email.com'
              value={email}
              onChange={handleEmailInput}
            />
          </label>

          {emailErrorMessage && (
            <div className='flex gap-2 mb-3 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke={`${emailErrorMessage ? '#EBA589' : '#D1D0D5'}`} strokeLinecap="round" strokeLinejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/><path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/><path stroke={`${emailErrorMessage ? '#EBA589' : '#D1D0D5'}`} strokeLinecap="round" strokeLinejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg>
              <p className={`${emailErrorMessage ? 'text-Orange700/65 font-' : 'text-Neutral500'} text-[0.9rem] font-bold`}>Please enter a valid email.</p>
            </div>
          )}

          <label className='text-xl text-Neutral300' htmlFor="gitHub">GitHub Username
            <input 
              className='w-full border text-Neutral300 text-2xl border-Neutral300 rounded-xl bg-Neutral700/30 mt-2 mb-5 p-3 pl-5 
              focus:border-4 focus:outline-Neutral900 hover:bg-Neutral700/75 cursor-pointer' 
              type="text" 
              name='gitHub' 
              id='gitHub' 
              placeholder='@yourusername'
              value={github}
              onChange={handleNameGithubInput}
            />
          </label>
      
          <button 
            className='w-full bg-Orange500 text-Neutral900 font-bold text-xl rounded-2xl p-4 mt-2 
            focus:border-3 focus:outline-Neutral900 hover:bg-Orange700 cursor-pointer' 
            type="submit"
            >Generate My Ticket
          </button>
        </form>
      </div>   
      )}
      
    </>
  )
}
