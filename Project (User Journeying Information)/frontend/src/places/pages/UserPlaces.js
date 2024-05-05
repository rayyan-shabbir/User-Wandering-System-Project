import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the World!",
    imageUrl: "https://th.bing.com/th/id/OIP.Rq0MwleqnFbpY0j2znBjHgHaE8?pid=ImgDet&rs=1",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    },
    creator: 'u1'
  },
  
  {
    id: "p2",
    title: "Australia Sydney Ground",
    description: "One of the most famous sky scrapers in the World!",
    imageUrl: "https://th.bing.com/th/id/OIP.Rq0MwleqnFbpY0j2znBjHgHaE8?pid=ImgDet&rs=1",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    },
    creator: 'u2'
  }
]

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

  return (
    <PlaceList items={loadedPlaces}>

    </PlaceList>
  )
}

export default UserPlaces
