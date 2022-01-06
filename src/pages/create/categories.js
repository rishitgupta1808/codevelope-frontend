import React from "react";

import styled from 'styled-components'
import SelectCategory from "../../components/CreateProfile/SelectCategory";

const CategoryContainer = styled.div`

`

const Categories = () => {

    return(
        <div style={{margin: `0 auto`,width: `53%`, paddingTop: `4em`}}>
        <CategoryContainer>  
          <SelectCategory/> 
        </CategoryContainer>
        </div>
    )
}

export default Categories