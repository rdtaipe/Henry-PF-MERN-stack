import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { TbBrandGithub } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();
  return (
    pathname !== '/' ? (
      <footer className="bg-gray-900 border-t border-black py-14 w-full z-50">
        <div className='container mx-auto px-8 mb-14'>
          <div className='grid lg:grid-cols-2'>
            <div className='mb-10 lg:mb-0'>
              <div className='flex flex-grow items-center'>
                <img src={logo} alt="logo" className='w-[10px]' />
                <h1 className="font-bold text-transparent bg-clip-text text-white px-2">ChicCloset</h1>
              </div>
              <p className='text-gray-400'>Dress To Impress And Never Stress.</p>
            </div>
            <div>
              <div className='grid md:grid-cols-3'>
                <div className='mb-8 lg:mb-0'>
                  <p className='text-lg font-medium text-white mb-5'>Product</p>
                  <ul>
                    <li className='mb-5'><Link to='/home' className='text-gray-400'>Indumentary</Link></li>
                    <li className='mb-5'><Link to='/home' className='text-gray-400'>Clothes</Link></li>
                  </ul>
                </div>
                <div className='mb-8 lg:mb-0'>
                  <p className='text-lg font-medium text-white mb-5'>Company</p>
                  <ul>
                    <li className='mb-5'><a href='/about' className='text-gray-400'>About ChicCloset</a></li>
                    <li className='mb-5'><a href='' className='text-gray-400'>Blog</a></li>
                    <li className='mb-5'><a href='/form' className='text-gray-400'>I want to publish a product</a></li>
                  </ul>
                </div>
                <div>
                  <p className='text-lg font-medium text-white mb-5'>Support</p>
                  <ul>
                    <li className='mb-5'><a href='' className='text-gray-400'>Contact Us:</a></li>
                    <li className='mb-5'><a href='' className='text-gray-400'>chicclosethenry@gmail.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto px-8 xl:px-0 border-t border-gray-400 pt-10'>
          <div className='grid lg:grid-cols-2'>
            <p className='text-gray-400 mb-5 lg:mb-0'>ChicCloset 2023 | All rights reserved.</p>
            <div className='flex lg:justify-end items-center'>
              <p className='text-gray-400 mr-7'>Follow us on:</p>
              <div className='flex justify-center items-center bg-white rounded-full h-10 w-10 outline-2 outline-red-600'>
                <a href="https://github.com/rdtaipe/Henry-PF" className='hover:animate-shake hover:outline-offset-4' target='_blank'><TbBrandGithub size={30} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    ) : null
  )
};

export default Footer