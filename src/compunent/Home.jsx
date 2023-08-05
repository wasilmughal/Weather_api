import React, { useEffect, useState } from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import { CContainer, CNavbar ,CNavbarBrand,CForm,CFormInput,CButton } from '@coreui/react';
import axios from 'axios';

import "./Home.css"


import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { detectOverflow } from '@popperjs/core'

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function Home() {

    const [WeatherData, setWeatherData] = useState([])
    const [cityName, setcityName] = useState("")
    const [Wind, setWind] = useState([])
    const [Coordinate, setCoordinate] = useState([])
    const [sys, setsys] = useState([])
   
    let weather = []
    const [CityName, setCityName] = useState('')
    const [serch, setserch] = useState('karachi')
    const [currentTime, setCurrentTime] = useState(new Date());
    const integerValue = Math.round(WeatherData.temp_max);
    const windspeed =Math.round(Wind.speed)




    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://pro.openweathermap.org/data/2.5/weather?q=${serch}&appid=3500aa8ab775cb0cb97ead2b9fc41866&units=metric`,
            headers: {}
        };

        axios.request(config)
            .then(async (response) => {
                console.log(response.data);
                if (response) {
                    weather = await response.data
                    if (weather) {
                        setWeatherData(weather.main)
                        setcityName(weather.name)
                        setWind(weather.wind)
                        setCoordinate(weather.clouds)
                        setsys(weather.weather)
                        // console.log(WeatherData);
                    }
                }


            })
            .catch((error) => {
                console.log(error);
            });

            const intervalId = setInterval(() => {
              setCurrentTime(new Date());
            }, 1000); 

    }, [serch])

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const City = (e) => {
        setCityName(e.target.value)
     
    }
    const search = () => {
     setserch(CityName)
       
    };


  return (
    <div>
      
      <CNavbar colorScheme="light" className="bg-light">
  <CContainer fluid>
   
  <CNavbarBrand href="#">  Weather</CNavbarBrand>
    <CForm className="d-flex">
      <CFormInput type="text" className="me-2" placeholder="Search" onChange={(e)=>City(e)} />
      <CButton type="button" color="success" variant="outline"  onClick={()=>search()}>
        Search
      </CButton>
    </CForm>
  </CContainer>
</CNavbar>






<section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
            <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex">
                  <MDBTypography tag="h6" className="flex-grow-1">
                   {cityName}
                  </MDBTypography>
                  <MDBTypography tag="h6">{`${hours}:${minutes}`}</MDBTypography>
                </div>

                <div className="d-flex flex-column text-center mt-5 mb-4">

   
       <MDBTypography tag="h6" className="display-4 mb-0 font-weight-bold" style={{ color: "#1C2331" }}>
    {`${integerValue}°C`} </MDBTypography>

{
  sys.map((v)=>{
    return(
      <>
       <span className="small" style={{ color: "#868B94" }}>
                  {v.main}
                  </span>
      </>
    )
  })
}
</div>

                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{fontSize: '1rem'}}>
                    <div>
                      <MDBIcon
                        fas
                        icon="wind fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {`${windspeed} km/h`} </span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="tint fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {`${Coordinate.all}%`} </span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="sun fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1">  {`${integerValue}°C`} </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                      width="100px"
                    />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>



    </div>
  )
}

export default Home
