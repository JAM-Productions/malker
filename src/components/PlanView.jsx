import React from 'react';
import { useState } from 'react';

const PlanView = () => {
    const [title, setTitle] = useState("Excursion Montserrat")
    const [author, setAuthor] = useState("Jordi Bonet")
    const [date, setDate] = useState("Dia")
    const [location, setLocation] = useState("Localizacion")
    const [description, setDescription] = useState("Lorem ipsum dolor sit amet consectetur adipiscing elit, metus sem ridiculus aliquet primis natoque sociis netus, montes imperdiet placerat magnis orci quisque. Dui praesent fermentum orci id taciti, natoque placerat volutpat suscipit diam, tempus porta hac nulla. Inceptos nullam pellentesque volutpat egestas natoque consequat ultrices, cubilia a scelerisque felis parturient. Ac nisi volutpat quisque ultrices donec gravida sollicitudin felis tristique cras, id at ornare aliquet elementum ut conubia nec eget, condimentum penatibus commodo lobortis magnis maecenas a dignissim cum. Vulputate donec vitae ridiculus dictumst lectus posuere senectus, sagittis eu netus montes curabitur lacus euismod nibh, blandit semper a libero etiam vel. Lacinia himenaeos consequat nec aenean conubia aliquam odio fusce justo, egestas at rhoncus dui turpis potenti placerat integer magnis, sem vulputate etiam tincidunt pretium tellus luctus non.")


    return ( 
        <div>
            {/* Información del plan */}
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col w-full ">
                    <h1 class="sm:text-3xl text-2xl font-medium text-gray-900">{title}</h1>
                    <p class="mt-3 text-base">{date} - {location}</p>
                    <div class="border-t-2 border-gray-400 ml-3 mb-5 mt-3"></div>
                    <p>{description}</p>
                    <p class="text-right mt-5">{author}</p>
                </div>
            </div>
            {/* Unirse */}
        </div>
    )
}

export default PlanView;