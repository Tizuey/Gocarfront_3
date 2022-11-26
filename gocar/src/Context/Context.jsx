import React, { createContext, useState, useEffect } from "react";

export const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [carsImage, setCarsImage] = useState([]);
  const [carsProducts, setcarsProducts] = useState([]);
  const [calendar, setCalendar] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      color: "#f48240",
      key: "selection",
    },
  ]);
  const [rent, setRent] = useState();

  // Cars
  const urlCategories = "http://52.90.140.192:8081/categories";
  useEffect(() => {
    fetch(urlCategories)
      .then((responseCars) => responseCars.json())
      .then((carsJSON) => setCars(carsJSON));
  }, []);

  // Products
  const urlProducts = "http://52.90.140.192:8081/products";
  useEffect(() => {
    fetch(urlProducts)
      .then((responseCars) => responseCars.json())
      .then((carsJSON) => setcarsProducts(carsJSON));
  }, []);

  // Images
  const urlImages = "http://52.90.140.192:8081/images";
  // useEffect(() => {
  //     fetch(urlImages)
  //         .then(responseCars => responseCars.json())
  //         .then(carsJSON => setCarsImage(carsJSON) )
  // }, [])

  useEffect(() => {
    fetch(urlImages)
      .then((responseCars) => responseCars.json())
      .then((carsJSON) => {
        const images = carsJSON.map((car) => {
          // const imagens = car.images.map(imagem => {
          //   return {
          //     original: imagem,
          //     thumbnail: imagem
          //   }
          // })

          // return (
          //   car.urlImage
          // )

          return {
            ...car,
            images: [
              {
                original: car.urlImage,
                thumbnail: car.urlImage,
              },
              {
                original: car.urlImage,
                thumbnail: car.urlImage,
              },
              {
                original: car.urlImage,
                thumbnail: car.urlImage,
              },
              {
                original: car.urlImage,
                thumbnail: car.urlImage,
              },
            ],
          };
        });

        // console.log(images);
        setCarsImage(images);
      });
  }, []);

  // _________________________teste JWT API

  // criação de usuário
  // const urlProducts = "http://52.90.140.192:8081/products";
  // useEffect(() => {
  //   fetch(urlProducts)
  //     .then((responseCars) => responseCars.json())
  //     .then((carsJSON) => setcarsProducts(carsJSON));
  // }, []);


  return (
    <Context.Provider
      value={{
        cars,
        setCars,
        carsImage,
        setCarsImage,
        carsProducts,
        setcarsProducts,
        calendar,
        setCalendar,
        rent,
        setRent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;