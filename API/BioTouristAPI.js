import { API_URL } from 'react-native-dotenv'
import axios from 'axios'

export function postRequest(path, data){

    return axios.post(API_URL + path,{
        body:
            data
    })
}

export function postRequestQuiNeFonctionnePas(path, data){
    let formData = new FormData();
    formData.append('api_token',"XBxgy8DbH1Hbp1hQ12FDciR6QGit8wbMZdIGOYwU5R21hEdtaTwcYfiMoDAEycFHVBJ9j78kyz6QoQxw")
    console.log(formData)
    //console.log(data)
    return fetch(API_URL + path,{
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: data
    })
        .then((response) => response.json())
        .then((responseJson) => console.log(responseJson) )
        .catch((error) => console.error(error))
}
export function ExampleRequest(path){
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
            .catch((error) => console.error(error))
        .then((data) => console.log(data))
}