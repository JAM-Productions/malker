import React, { useState, useEffect } from "react";
import DropdownPlan from "../dropdown/DropdownPlan";
import UserCard from "../user/UserCard";

const PlanShowParticipants = () => {
    const title = "Excursion Montserrat"
    const author = "Jordi Bonet"
    const date = "Dia"
    const location = "Localizacion"
    const description = "Lorem ipsum dolor sit amet consectetur adipiscing elit, metus sem ridiculus aliquet primis natoque sociis netus, montes imperdiet placerat magnis orci quisque. Dui praesent fermentum orci id taciti, natoque placerat volutpat suscipit diam, tempus porta hac nulla. Inceptos nullam pellentesque volutpat egestas natoque consequat ultrices, cubilia a scelerisque felis parturient. Ac nisi volutpat quisque ultrices donec gravida sollicitudin felis tristique cras, id at ornare aliquet elementum ut conubia nec eget, condimentum penatibus commodo lobortis magnis maecenas a dignissim cum. Vulputate donec vitae ridiculus dictumst lectus posuere senectus, sagittis eu netus montes curabitur lacus euismod nibh, blandit semper a libero etiam vel. Lacinia himenaeos consequat nec aenean conubia aliquam odio fusce justo, egestas at rhoncus dui turpis potenti placerat integer magnis, sem vulputate etiam tincidunt pretium tellus luctus non. Lorem ipsum dolor sit amet consectetur adipiscing elit, metus sem ridiculus aliquet primis natoque sociis netus, montes imperdiet placerat magnis orci quisque. Dui praesent fermentum orci id taciti, natoque placerat volutpat suscipit diam, tempus porta hac nulla. Inceptos nullam pellentesque volutpat egestas natoque consequat ultrices, cubilia a scelerisque felis parturient. Ac nisi volutpat quisque ultrices donec gravida sollicitudin felis tristique cras, id at ornare aliquet elementum ut conubia nec eget, condimentum penatibus commodo lobortis magnis maecenas a dignissim cum. Vulputate donec vitae ridiculus dictumst lectus posuere senectus, sagittis eu netus montes curabitur lacus euismod nibh, blandit semper a libero etiam vel. Lacinia himenaeos consequat nec aenean conubia aliquam odio fusce justo, egestas at rhoncus dui turpis potenti placerat integer magnis, sem vulputate etiam tincidunt pretium tellus luctus non."

    const users = ["Mark", "Albertfdgdgdsfg", "Albertfdgdgdsfg", "Albertfdgdgdsfg", "Albertfdgdgdsfg", "Albertfdgdgdsfg", "Albertfdgdgdsfg"]
    const currentUser = "Mark"
    return (
        <section>

            <DropdownPlan title={title} date={date} location={location} description={description} author={author}/>
            <div className="container mx-auto mb-10">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-10 w-10/12 mx-auto">
                {users.map((user) => (
                    <UserCard user={user} currentUser={currentUser} key={user}/>
                ))}
            </div>
            </div>
        </section>
    )
}

export default PlanShowParticipants;
