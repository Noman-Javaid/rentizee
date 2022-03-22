import React from 'react'
import FooterComponent from './FooterComponent'
import { useEffect } from 'react';
export default function About() {
  useEffect(() => {
    document.title= "rentizee | About";
}, [])
  return (
    <div>
      <div className="container mt-3">
    <h1>About Us</h1>
    <pre>
      We are Rentizee <br />
      We provides you all types of rental items at one plateform<br />
      This platform will help you to search out your best rental service and fulfill your need asap<br />

    </pre>
</div>
        <FooterComponent />
    </div>
  )
}
 