import React, { useState } from 'react'
import './styles.css'
import { webCardsData } from './CardsData'
import FilterComponent from './FilterComponent'
import filtericon from '../components/assets/filterIcon.png'
import likeicon from '../components/assets/likeIcon.png'
import eyeicon from '../components/assets/eyeIcon.png'
import windowsicon from '../components/assets/windowsIcon.png'
import squareicon from '../components/assets/squareIcon.png'

const backgroundColors = ['#B2D3C2', '#ADD8E6', '#FFDFD3', '#ADD8E6', '#B2D3C2', '#FFDFD3'];

const WebDesignScreen = () => {
  const [filterState, setFilterState] = useState(false)
  const [filteredData, setFilteredData] = useState(webCardsData);
  const [filters, setFilters] = useState({
    dynasty: '',
    material: '',
    region: '',
    min: '',
    max: ''
  });

  const filterHandler = () => {
    setFilterState(true);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = webCardsData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue) ||
        item.timePeriod.toLowerCase().includes(searchValue) ||
        item.material.toLowerCase().includes(searchValue) ||
        item.region.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = [...webCardsData];
    if (filters.dynasty !== '') {
      filtered = filtered.filter(
        (item) =>
          item.dynasty.toLowerCase().includes(filters.dynasty.toLowerCase())
      );
    }
    if (filters.material !== '') {
      filtered = filtered.filter(
        (item) =>
          item.material.toLowerCase().includes(filters.material.toLowerCase())
      );
    }
    if (filters.min !== '') {
      filtered = filtered.filter(
        (item) => {
          const minValue = item.timePeriod.replace(/\D/g, '');
          return parseInt(minValue) >= parseInt(filters.min);
        }
      );
    }
    if (filters.max !== '') {
      filtered = filtered.filter(
        (item) => {
          const maxValue = item.timePeriod.replace(/\D/g, '');
          return parseInt(maxValue) <= parseInt(filters.max);
        }
      );
    }
    if (filters.region !== '') {
      filtered = filtered.filter(
        (item) =>
          item.region.toLowerCase() === filters.region.toLowerCase()
      );
    }
    setFilteredData(filtered);
    closeModel()
  };

  const closeModel = () => {
    setFilterState(false)
  }

  const clearAllHandler = () => {
    setFilters({
      dynasty: '',
      material: '',
      region: '',
      min: '',
      max: ''
    })
    setFilteredData(webCardsData)
  }

  return (
    <div className={filterState ? 'web-container filter-container' : 'web-container'}>
      <div className='filter-section'>
        <input type='search' placeholder='Search from the worlds antique collection' className='search-field' onChange={handleSearchChange} />
        <div className='filer-surprise-buttons'>
          <button className='filter-button' onClick={filterHandler}><img src={filtericon} className='filtericon' />FILTERS</button>
          <button className='surprise-button'>SURPRISE ME</button>
        </div>
      </div>
      <div className='icons-section'>
        <button className='icon-buttons'><img src={squareicon} className='squareIcon' /></button>
        <button><img src={windowsicon} className='squareIcon' /></button>
      </div>
      <div className='cards-section'>
        {filteredData.length > 0 ?
          <>
            {filteredData.map((each, index) => {
              const backgroundColor = backgroundColors[index % backgroundColors.length];
              return (
                <div className='cards'>
                  <div className='image-section' style={{ backgroundColor: backgroundColor }}>
                    <div className='Image-like-icon-section'>
                      <img src={likeicon} className='icons' />
                      <span className='like-text'>1</span>
                      <img src={eyeicon} className='icons' />
                    </div>
                    <img src={each.image} className='card-images' />
                  </div>
                  <div className='description-section'>
                    <div className='name-time-section'>
                      <h4>{each.name}</h4>
                      <h4>{each.timePeriod}</h4>
                    </div>
                    <p>{each.description}</p>
                    <div className='material-region-section'>
                      <p>{each.material}</p>
                      <p>{each.region}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </> :
          <div className='no-data-text'>
            <h2>NO DATA FOUND</h2>
          </div>}
      </div>
      {filterState && <FilterComponent
        closeModel={() => closeModel()}
        handleFilterChange={(e) => handleFilterChange(e)}
        applyFilter={(e) => applyFilters(e)}
        filters={filters}
        clearAllHandler={() => clearAllHandler()} />}
    </div>
  )
}

export default WebDesignScreen