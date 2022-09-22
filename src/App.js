import { useState, useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'


function App(){
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
      e.preventDefault()
      //  Fetch data
      const fetchData = async () => {
        document.title = `${term} Music`
        setMessage(`Search results for: ${term}`)
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        // console.log(resData)
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('No music found for the search term.')
        }
      }
      fetchData()
    }

    return (
        <div className='App'>
          <SearchContext.Provider value={{
            term: searchInput,
            handleSearch: handleSearch
          }}>
            <SearchBar />
          </SearchContext.Provider>
          {message}
          <DataContext.Provider value={data}>
            <Gallery />
          </DataContext.Provider>
        </div>
    );
}

export default App;

