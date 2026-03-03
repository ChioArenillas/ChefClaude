import React from 'react'
import chefClaudeLogo from '../public/chef.png'

export default function Header() {
  return (
    <header>
      <img src={chefClaudeLogo} alt='chef icon'/>
      <h1>Chef Claude</h1>
    </header>
  )
}
