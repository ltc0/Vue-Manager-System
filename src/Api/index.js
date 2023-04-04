import axios from "../axios.js";

export function gstatistics1(){
    return axios.get("/admin/statistics1")  
}

export function gstatistics2(){
    return axios.get("/admin/statistics2")  
}

export function gstatistics3(type){
    return axios.get("/admin/statistics3?type="+type )  
}