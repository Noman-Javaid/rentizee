import React from 'react'
import FooterComponent from './FooterComponent'
import { useEffect } from 'react';

export default function FAQ() {
  useEffect(() => {
    document.title= "rentizee | FAQ";
}, [])
  return (
    <div>
        <div className="container mt-3">
        <h1>FAQ page</h1>
        <h4 className="text-info mt-2" >Question: Who We Are?</h4>
        <small className="text-primary">We are Rentizee, we help you to search all you need rentals at one platform </small>
        <h4 className="text-info mt-2" >Question: How it Works?</h4>
        <small className="text-primary">Well! Anyone can post any rental item with specific detsils, Then the visitors can check it out and can contact to regarding person to fulfill his rental need on any aspects</small>
        <h4 className="text-info mt-2" >Question: How can we Post rental?</h4>
        <small className="text-primary">Yow will register yourself or login if already registered, You can then add rentals in your portfolio, check its progress, edit it or delete it</small>
        <h4 className="text-info mt-2" >Question: How can we register?</h4>
        <small className="text-primary">Simply from navigation bar you can register yourself, edit your personal details etc, and you can add just 3 rentals by premium account</small>
        <h4 className="text-info mt-2" >Question: So What can I do for adding more than 3 rentals?</h4>
        <small className="text-primary">You will contact to admin or regarding person on contact page, after some confirmation they will charge corresponding payment and then your quota will be increased accourding to payments</small>
        <h4 className="text-info mt-2" >Question: What is new in this portal?</h4>
        <small className="text-primary">So we are the one who provides you a platform to check and aquire best rental service regardless of chacking other posts which are not related to you</small>
        <h4 className="text-info mt-2" >Question: What is Subscriber Feature?</h4>
        <small className="text-primary">We allow any user to subscribe the agencies or any other user who posts any rental on portal, In this regards the subscriber can view all rental posts posted by that subscribed user</small>
        </div>
        <FooterComponent />
    </div>
  )
}
 