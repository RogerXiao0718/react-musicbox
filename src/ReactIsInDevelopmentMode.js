import React from "react";

export default function ReactIsInDevelopmentMode() {
    return '_self' in React.createElement('div');
}
