import React from 'react'
import closeicon from '../components/assets/closeIcon.png'
import './styles.css'
import { webCardsData } from './CardsData'

const FilterComponent = (props) => {
    const uniqueDynasty = [...new Set(webCardsData.map((item) => item.dynasty))];
    const uniqueMaterial = [...new Set(webCardsData.map((item) => item.material))];
    const uniqueRegions = [...new Set(webCardsData.map((item) => item.region))];

    const TimePeriodValues = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000]

    return (
        <div className='filter-component'>
            <div>
                <div className='closeIcon'>
                    <h2>Search by Filter</h2>
                    <img src={closeicon} onClick={props.closeModel} className='filtericon' />
                </div>
                <div className='select-section'>
                    <span>Select Dynasty</span>
                    <select name='dynasty' onChange={props.handleFilterChange} value={props.filters.dynasty}>
                        <option value=''>All</option>
                        {uniqueDynasty.map(e => {
                            return (
                                <option>{e}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='select-section'>
                    <p>Select Period</p>
                    <div>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            className="thumb thumb--zindex-3"
                            name='min'
                            onChange={props.handleFilterChange}
                            value={props.filters.min}
                        />
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            className="thumb thumb--zindex-4"
                            name='max'
                            onChange={props.handleFilterChange}
                            value={props.filters.max}
                        />
                        <div className="slider">
                            <div className="slider__track" />
                            <div className="slider__range"
                            />
                        </div>
                    </div><br />
                    <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
                        {TimePeriodValues.map(e => {
                            return (
                                <p>{e}</p>
                            )
                        })}
                    </div>
                </div>
                <div className='select-section'>
                    <p>Select Material</p>
                    <select name='material' onChange={props.handleFilterChange} value={props.filters.material}>
                        <option value=''>All</option>
                        {uniqueMaterial.map(e => {
                            return (
                                <option>{e}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='select-section'>
                    <p>Select Region</p>
                    <select name='region' onChange={props.handleFilterChange} value={props.filters.region}>
                        <option value=''>All</option>
                        {uniqueRegions.map(e => {
                            return (
                                <option>{e}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className='apply-clear-buttons'>
                <button className='ClearAll-button' onClick={props.clearAllHandler}>Clear All</button>
                <button className='Apply-button' onClick={props.applyFilter}>Apply</button>
            </div>
        </div>
    )
}

export default FilterComponent





