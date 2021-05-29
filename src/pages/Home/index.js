import React, { useState } from 'react'
import logo from './star-wars-logo.png'
import './index.css'
import starwars from '../Api/starwars'
import { useHistory } from 'react-router'
import Search from '../../Components/Search'
import './index.css'

const HomePage = () => {
  const [search, setsearch] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const goToLink = (data) => {
    history.push(`/person/${data}`)
  }

  return (
    <>
      <div>
        <div className='logo'>
          <img src={logo} alt='Star Wars Logo' />
        </div>

        <Search
          data={starwars}
          onChange={(search) => setsearch(search)}
          search={search}
          goToLink={goToLink}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </>
  )
}

export default HomePage
