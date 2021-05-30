import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useThrottle } from 'use-throttle'

const Search = ({ data, onChange, goToLink, loading, setLoading }) => {
  const [active, setActive] = useState(0)
  const [search, setSearch] = useState('')
  const scrollReferance = useRef()
  const throttledText = useThrottle(search, 1000)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    onChange(throttledText)
  }, [throttledText, onChange])

  useEffect(() => {
    if (search === '') {
      setSuggestions([])
    } else {
      let out = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )

      setSuggestions(out)
    }
    setLoading(false)
  }, [data, search])

  const handleClear = () => {
    setSearch('')
    onChange('')
    setLoading(false)
  }
  const inputChange = (e) => {
    setSearch(e.target.value)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleChangeSuggestions = (e) => {
    switch (e.keyCode) {
      //ArrowDown
      case 40: {
        if (active >= 5) {
          setActive(0)
        } else {
          setActive((prev) => prev + 1)
        }

        break
      }
      //Arrow Up
      case 38: {
        if (active === 1) {
          setActive(0)
        } else if (active <= 0) {
          setActive(5)
        } else {
          setActive((prev) => prev - 1)
        }
        break
      }

      default: {
        return
      }
    }
  }

  return (
    <>
      <SearchBarWrapper search={search} onKeyUp={handleChangeSuggestions}>
        <Input value={search} onChange={inputChange} />
        <RightSide>
          {search && (
            <div
              onClick={handleClear}
              style={{ marginTop: '5px', cursor: 'pointer' }}
            >
              X
            </div>
          )}
          {loading && <Loader />}
        </RightSide>
        <SearchImage
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyn5dnDz1NqUwdBFa9w0q9W-zDk4kVdUgktApk5CCcZLvForvpgjHtu1xG-96NZkGFn7Q&usqp=CAU'
          alt='icon'
        />
      </SearchBarWrapper>
      {!loading && (
        <SuggestionBox
          ref={scrollReferance}
          limit={3}
          length={suggestions.length}
          active={active}
        >
          {suggestions.map((item, index) => (
            <div
              key={item.id}
              onMouseOver={() => setActive(index + 1)}
              onClick={() => goToLink(item.id)}
            >
              {item.name}
            </div>
          ))}
        </SuggestionBox>
      )}
    </>
  )
}

export default Search

const SearchBarWrapper = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  padding: 10px;
  width: 400px;
  display: flex;

  border-bottom-right-radius: ${({ search }) => (search ? '0px' : '20px')};
  border-bottom-left-radius: ${({ search }) => (search ? '0px' : '20px')};

  background: #2d2f30;
  color: #f2f2f2;
`

const SearchImage = styled.img`
  height: 30px;
  width: 30px;

  border-radius: 50%;
`

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  background: #2d2f30;
  color: #f2f2f2;
`

const RightSide = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding-right: 10px;
`

const SuggestionBox = styled.div`
  background: #2d2f30;
  color: #f2f2f2;
  flex: 0 0 auto;
  flex-direction: column;
  display: ${({ length }) => (length !== 0 ? 'flex' : 'none')};
  max-height: 150px;
  overflow: auto;
  cursor: pointer;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-color: ${({ length }) => (length ? 'transparent' : 'black')};
  border: 1px solid black;
  & * {
    flex: 1;
    padding: 5px;
    text-align: left;
    padding-left: 30px;
    height: 30px;
  }
  & :nth-child(${({ active }) => active}) {
    background: gray;
    color: white;
    font-weight: bold;
  }
  & :nth-child(n + ${({ limit }) => limit + 1}) {
    display: none;
  }
`

const Loader = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid yellow;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  animation: spin 3s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
