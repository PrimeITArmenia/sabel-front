import { Container } from "react-bootstrap";
import style from "./profile.module.scss";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import toast , {Toaster} from 'react-hot-toast'
import {url} from '@/api'
import Loading from '../loading/index'

function Profile( ) {
  const session = useSession();
  const token = session.data?.user?.token?.accessToken
  const [ profileUser, setProfileUser] = useState({
    name : "",
    email :"",
    password :"",
    newPassword : "",
    picture : null,
  })
  const [ isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const getUser = async ()=>{
      if( token ){
        console.log("mtav")
        await axios.get(`${url}/user/profile`, {
          headers:{
            'Authorization' : `Bearer ${token}`
          }})
            .then((response) => {
              console.log('use-effect-user-info', response)
              setProfileUser({
                name : response.data?.name,
                email : response.data?.email,
                picture : response.data?.picture,
                oldPassword: "",
                newPassword : ""
              })
              setIsLoading(true)
            })
            .catch((error) => console.log( 'error-get-user-info', error ) )
      }
    }
    getUser()
  }, [token, session.data?.user?.token?.accessToken]);


  const handleEditButtonClick = async () => {
    setIsLoading(!isLoading)
    const formData = new FormData()
    const {picture, name} = profileUser

    formData.append('picture', picture);
    formData.append('name', name);
    try{
      const response = await axios.patch(`${url}/user`, formData,
          {
            headers:{
          'Authorization': `Bearer ${token}`,
        }
      })
      if( response.status === 200 ){
        setProfileUser({
          email : response?.data.email,
          name : response?.data.name,
          picture: response.data.picture
        })
      }
      console.log('response', response)
      setIsLoading(true)
    }catch (err){
      console.log('err',err)
    }
  };


  const handleChangePassword = async (event) =>{
    event.preventDefault()
    if( !profileUser.oldPassword ){
      toast.error('Invalid old password',)
      return
    }
    if( !profileUser.newPassword ){
      toast.error('Invalid new password')
      return
    }
  event.preventDefault()
  try {
    const response  = await axios.post(`${url}/password/change`, {
      email : profileUser.email,
      oldPassword : profileUser.oldPassword,
      newPassword : profileUser.newPassword
    },{
      headers :{
        'Authorization' : `Bearer ${token}`
      }})

    if( response.status === 200 ){
      console.log('change-password--response', response)
      setProfileUser({...profileUser, password: "", newPassword: ""})
      toast.success("Password successfully changed")
    }

  }catch(err){
    toast.error(err?.response?.data?.message)
    console.log('error-change-password', err)
  }
}
  
    return (
       <>
         {
           !isLoading ? (
                  <Loading/>
               ) : (
               <section className={style.profile_section}>
                 <Toaster/>
                 <Container className={` text-start ${style.container_profile} pb-5`}>
                   <h1 className="text-center display-1">Profile</h1>
                   <div className={style.profile_settings}>
                     <h4 className="fw-bold">Profile Settings</h4>

                     <Image
                         src={profileUser.picture ? profileUser.picture : "/assets/icons/user-icon.svg"}
                         width={70}
                         height={70}
                         className="rounded-circle"
                         alt=""/>

                     <p className="pt-4">Profile Picture</p>
                     <p className={style.profile_text_upload_file}>
                       You can upload a JPG or PNG file. Maximum file size is 2MB.
                     </p>

                     <form className={style.section_email_password}>

                       <fiieldset className={` border-1 border-black bg-quaternary ${style.name_surname}`}>
                         <input type="file" id="img" name="img" accept="image/*"
                                onChange={(event) => setProfileUser({...profileUser, picture: event.target.files[0]})}
                         />
                       </fiieldset>

                       <fieldset className="border ">
                         <legend> Email Address</legend>
                         <input
                             type="email"
                             className="form-control shadow-none"
                             id="email"
                             value={profileUser.email}
                         />
                         <label htmlFor="email" className="visually-hidden ">
                           email
                         </label>
                       </fieldset>

                       <fieldset className={`border ${style.name_surname}`}>
                         <legend> Full Name</legend>
                         <input
                             type="name"
                             className="form-control shadow-none"
                             id="name"
                             value={profileUser.name}
                             onChange={(e) => setProfileUser({...profileUser, name: e.target.value})}
                         />
                         <label htmlFor="name" className="visually-hidden">
                           email
                         </label>
                       </fieldset>


                       <fieldset className={`border d-flex  position-relative ${style.password_legend}`}>
                         <legend>Password</legend>
                         <input
                             type="password"
                             className="form-control shadow-none"
                             id="inputpassword"
                             placeholder="Old-password"
                             value={profileUser.oldPassword}
                             onChange={(e) => setProfileUser({...profileUser, oldPassword: e.target.value})}/>
                         <label htmlFor="inputpassword" className="visually-hidden">
                           Password
                         </label>
                       </fieldset>

                       <fieldset className={`border d-flex  position-relative ${style.password_legend}`}>
                         <legend>Password</legend>
                         <input
                             type="password"
                             className="form-control shadow-none"
                             id="inputpassword"
                             placeholder="New-password"
                             value={profileUser.newPassword}
                             onChange={(e) => setProfileUser({...profileUser, newPassword: e.target.value})}/>
                         <label htmlFor="inputpassword" className="visually-hidden">
                           Password
                         </label>
                       </fieldset>


                       <button className={`border-0  ${style.profile_forgot_password}`}
                               onClick={(event) => handleChangePassword(event)}>
                         Change Password
                       </button>


                     </form>
                   </div>
                   {/*<div className={`${style.membership_area}`}>*/}
                   {/*  <h4 className="fw-bold"> Membership Area</h4>*/}
                   {/*  <div>*/}
                   {/*    <div className="d-flex justify-content-between align-items-center">*/}
                   {/*      <h6>Membership</h6>*/}
                   {/*      <button className="bg-primary border-0  text-quaternary p-1 text-black">*/}
                   {/*        <Link href={"/membership"} className="text-black text-decoration-none">*/}
                   {/*          View More*/}
                   {/*        </Link>*/}
                   {/*      </button>*/}
                   {/*    </div>*/}
                   {/*  </div>*/}
                   {/*</div>*/}

                   <div className={`${style.email_preferences}`}>
                     <h4 className="fw-bold">Email Preferences</h4>
                     {/* <div className="d-flex justify-content-between m-0">
            <h5>Sabel Promotions</h5>
            <div className={style.toggle_rect_color}>
              <input type="checkbox" id="rect3" name="check" />
              <label htmlFor="rect3"></label>
            </div>
          </div> */}
                     <div className="d-flex justify-content-between m-0">
                       <h5> Sabel News and Offers</h5>
                       <div className={style.toggle_rect_color}>
                         <input type="checkbox" id="rect2" name="check"/>
                         <label htmlFor="rect2"></label>
                       </div>
                     </div>

                     <button className="bg-primary border-0 rounded-2 mb-5" onClick={handleEditButtonClick}>
                       Edit Page
                     </button>
                     {/* <div className="d-flex justify-content-between m-0">
            <h5>Events</h5>
            <div className={style.toggle_rect_color}>
              <input type="checkbox" id="rect1" name="check" />
              <label htmlFor="rect1"></label>
            </div>
          </div> */}
                   </div>
                 </Container>
               </section>
           )
         }
       </>
    );
  }

export default Profile;
