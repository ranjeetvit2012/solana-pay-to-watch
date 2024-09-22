import {NavbarComponent} from "./NavbarComponent"
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer"
export const Dashboard = ()=>{

    return(
        <div className=""> 
            <NavbarComponent/>
            <Card className="max-w mr-36 ml-10 p-6">
  <h1 className="text-2xl font-bold">Dashboard</h1>
  <p>When you play this video, you will be charged 1 SOL per view</p>
  <div className="mt-4">
    {/* Add more components, tables, charts, etc., here */}
    

<div class="w-full p-4 text-center bg-white border
 border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
    <VideoPlayer mp4Source="https://cdn.sweply.com/media-assets/9bc91f36a5c5328f0b993a5dedf1739a9efba847.mp4" oggSource="movie.ogg" />
    
       
    </div>
</div>

  </div>
</Card>
        </div>
    )
}