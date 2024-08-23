// import React from 'react'
// import img from '../assets/profile-pictures/user1.png'

// function Header() {
//   return (
//     <>
        
// <nav class=" top-0 z-50 w-full bg-white border-b border-orange-200 dark:bg-neutral-800 dark:border-orange-600">
//   <div class="px-3 py-5 lg:px-5 lg:pl-3">
//     <div class="flex items-center justify-between">
//       <div class="flex items-center justify-start rtl:justify-end">
//         <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//             <span class="sr-only">Open sidebar</span>
//             <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//             </svg>
//          </button>
//         <a href="https://flowbite.com" class="flex ms-2 md:me-24">
//           <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
//           <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">VirtualR</span>
//         </a>
//       </div>
//       <div class="flex items-center">
//           <div class="flex items-center ms-3">
//             <div>
//               <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
//                 <span class="sr-only">Open user menu</span>
//                 <img class="w-10 h-10 rounded-full" src={img} alt="user photo"/>
//               </button>
//             </div>
            
//         </div>
//     </div>
//   </div>
//   </div>
// </nav>
//     </>
//   )
// }

// export default Header

import React, { useContext } from 'react';
import profile from '../assets/profile-pictures/default.png'

function Header({ toggleSidebar }) {

  return (
    <header className="flex items-center justify-between p-4 bg-neutral-800 text-white md:px-6 border-b-2 border-orange-600">
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div className="text-xl font-semibold">Logo</div>
      <div>
        <img
          src={profile}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
}

export default Header;
