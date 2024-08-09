// Importing React and useState, useEffect hooks
import React, { useEffect, useState } from "react";
import MemberView from "./MemberView";

// Defining the UserManager component
const UserManager = () => {
    return (
        <div>
            {/* Rendering the MemberView component */}
            <MemberView />
        </div>
    );
};

// Exporting the UserManager component as default
export default UserManager;
