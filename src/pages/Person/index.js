import React from 'react'
import { useHistory, useParams } from 'react-router'
import './index.css'
import starwars from '../Api/starwars'

function Person() {
  //getting id using params
  const { id } = useParams()
  const history = useHistory()
  const goToLink = () => {
    history.push(`/`)
  }

  return (
    <>
      <button onClick={() => goToLink()}>Back</button>
      {starwars.map((item) =>
        Number(id) === Number(item.id) ? (
          <div className='box'>
            <div className='box_image'>
              <img src={item.image} alt={item.name} />
            </div>
            <div className='box_info'>
              <div className='info_name'>{item.name}</div>
              <div className='info_heading'>Biographical information</div>
              <div className='info_bio'>
                <div className='bio_headers'>
                  <div>Homeworld</div>
                  <div>Born</div>
                  <div>Died</div>
                </div>
                <div className='bio_value'>
                  <div>{item.homeworld}</div>
                  <div>{item.bornLocation}</div>
                  <div>{item.died}</div>
                </div>
              </div>
              <div className='info_heading'>Physical description</div>
              <div
                className='info_bio'
                style={{ 'border-bottom-right-radius': '16px' }}
              >
                <div className='bio_headers'>
                  <div>Species</div>
                  <div>Gender</div>
                  <div>Height</div>
                  <div>Mass</div>
                  <div>Hair color</div>
                  <div>Eye color</div>
                  <div>Cybernetics</div>
                </div>
                <div className='bio_value'>
                  <div>{item.species}</div>
                  <div>{item.gender}</div>
                  <div>{item.height}</div>
                  <div>{item.mass}</div>
                  <div>{item.hairColor}</div>
                  <div>{item.eyeColor}</div>
                  <div>{item.cybernetics}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )
      )}
    </>
  )
}

export default Person
