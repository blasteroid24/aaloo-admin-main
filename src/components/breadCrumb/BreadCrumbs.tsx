import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';


type Props = {
  items: any[]
}

const BreadCrumbs = (props: Props) => {
  
  const {items} = props
  
    const home = { icon: 'pi pi-home', url: '/survey-management' }

  return (
    <BreadCrumb model={items} home={home} />

  )
}

export default BreadCrumbs

