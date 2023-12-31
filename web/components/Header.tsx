import Link from 'next/link';
import React from 'react';


const Header = () => {
  return (
    <header className="navbar bg-base-100 fixed top-0 z-50">
      <Link href="/" className="btn btn-ghost text-xl">MeetUp</Link>
    </header>
  )
}

export default Header;
