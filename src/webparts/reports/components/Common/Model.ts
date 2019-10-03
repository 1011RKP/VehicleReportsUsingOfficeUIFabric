import {
  Dropdown, IDropdown,
  DropdownMenuItemType,
  IDropdownOption
} from 'office-ui-fabric-react/lib/Dropdown';
import { ICheckboxStyles } from "office-ui-fabric-react/lib/Checkbox";


export const dropdownOption: IDropdownOption[] = [
  { key: '-- Please Select Type of Users --', text: '-- Please Select Type of Users --' },
  { key: 'All', text: 'All' },
  { key: 'Employees only', text: 'Employees only' },
  { key: 'Contractors only', text: 'Contractors only' },
  { key: 'Guests only', text: 'Guests only' }
];

export const noVehicledropdownOption: IDropdownOption[] = [
  { key: '-- Please Select Type of Users --', text: '-- Please Select Type of Users --' },
  { key: 'All', text: 'All' },
  { key: 'Employees only', text: 'Employees only' },
  { key: 'Contractors only', text: 'Contractors only' }
];

export const ddCountries: IDropdownOption[] = [
  { key: '-- Please Select Country --', text: '-- Please Select Country --' }
];

export const ddLocations: IDropdownOption[] = [
  { key: '-- Please Select Location --', text: '-- Please Select Location --' }
];

export const HTMLColumnsWithVehicle = [
  {
    Header: "Title",
    accessor: "Title"
    //sortable: false
  },
  {
    Header: "Vehicle Color",
    accessor: "VehicleColor"
  },
  {
    Header: "Vehicle Make",
    accessor: "VehicleMake"
  },
  {
    Header: "Vehicle Model",
    accessor: "VehicleModel"
  },
  {
    Header: "Vehicle State Code",
    accessor: "VehicleStateCode"
  },
  {
    Header: "Vehicle Tag",
    accessor: "VehicleTag"
  },
  {
    Header: "Vehicle Year",
    accessor: "VehicleYear"
  },
  {
    Header: "Incyte Employee",
    accessor: "IncyteEmployee"
  },
  {
    Header: "Intern",
    accessor: "Intern"
  },
  {
    Header: "Registered InUSA",
    accessor: "RegisteredInUSA"
  },
  {
    Header: "Non US Registered",
    accessor: "NonUSRegistered"
  },
  {
    Header: "Location",
    accessor: "Location"
  },
  {
    Header: "Country",
    accessor: "Country"
  }
];

export const HTMLColumnsWithOutVehicle = [
  {
    Header: "Title",
    accessor: "Title"
    //sortable: false
  },
  {
    Header: "Full Name",
    accessor: "FullName"
  },
  {
    Header: "Phone Number",
    accessor: "PhoneNumber"
  },
  {
    Header: "Email",
    accessor: "Email"
  },
  {
    Header: "Country",
    accessor: "Country"
  },
  {
    Header: "Country",
    accessor: "Country"
  }
];

export const EmployeeColumns = "ID,Title,RegisteredInUSA,VehicleStateCode,VehicleTag,VehicleYear,VehicleMake,VehicleModel,VehicleColor,ElectricCar,NonUSRegistered,IncyteEmployee,Intern,Company,Location,Country";

export const ConsultentColumns = "ID,Title,RegisteredInUSA,VehicleStateCode,VehicleTag,VehicleYear,VehicleMake,VehicleModel,VehicleColor,ElectricCar,NonUSRegistered,IncyteEmployee,Company,Location,Country";

export const GuestColumns = "ID,Title,RegisteredInUSA,VehicleStateCode,VehicleTag,VehicleYear,VehicleMake,VehicleModel,VehicleColor,ElectricCar,NonUSRegistered,Company,Location,Country";

export const allColumns = "ID,Title,RegisteredInUSA,VehicleStateCode,VehicleTag,VehicleYear,VehicleMake,VehicleModel,VehicleColor,ElectricCar,NonUSRegistered,Company,Location,Country";

export const NoVehicleEmployeeColumns = "ID,Title,FullName,PhoneNumber,Email,Country,Location";

export const NoVehicleConsultentColumns = "ID,Title,FullName,PhoneNumber,Email,Country,Location";

export const NoVehicleallColumns = "ID,Title,FullName,PhoneNumber,Email,Country,Location";


export const checkBoxCustomStyles: ICheckboxStyles = {
  checkbox: { color: '#FFFFFF', borderColor: '#FFFFFF!important', backgroundColor: "none!important", background: "none!important" },
  checkmark: { color: '#FFFFFF', backgroundColor: "none!important", background: "none!important" },
  text: { color: '#FFFFFF', backgroundColor: "none!important", background: "none!important" },
  textHovered: { color: '#FFFFFF', backgroundColor: "none!important", background: "none!important" },
  textFocused: { color: '#FFFFFF', backgroundColor: "none!important", background: "none!important" },
  label: { background: "none!important", backgroundColor: "none!important" },
  checkboxCheckedHovered: { color: '#FFFFFF', borderColor: '#FFFFFF!important', background: "none!important", backgroundColor: "none!important" },
  checkboxCheckedFocused: { color: '#FFFFFF', borderColor: '#FFFFFF!important', background: "none!important", backgroundColor: "none!important" },
  checkboxChecked: { color: '#FFFFFF', borderColor: '#FFFFFF!important', background: "none!important", backgroundColor: "none!important" },
};


