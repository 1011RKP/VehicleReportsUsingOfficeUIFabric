import * as React from 'react';
import { IReportsProps } from './IReportsProps';
import { IReportsState } from './IReportsState';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { sp } from '@pnp/sp';
import { All } from './All/all';
import { Error } from "./Error/error";
import { NoVehicle } from "./NoVehicle/noVehicle";
import {
  dropdownOption, noVehicledropdownOption,
  EmployeeColumns, NoVehicleallColumns,
  ConsultentColumns, NoVehicleEmployeeColumns,
  GuestColumns,
  ddCountries, ddLocations, allColumns, checkBoxCustomStyles, NoVehicleConsultentColumns
} from './Common/Model';
import restyles from './Reports.module.scss';
import 'office-ui-fabric-react/dist/css/fabric.css';
import {
  Dropdown, IDropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownInternalProps
} from 'office-ui-fabric-react/lib/Dropdown';
import {
  Button, ButtonType
} from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
//import Icon from '@fortawesome/react-fontawesome';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox, ICheckboxStyles } from "office-ui-fabric-react/lib/Checkbox";
import { findDOMNode } from 'react-dom';


export default class Reports extends React.Component<IReportsProps, any> {

  public errorComponent;
  public ddCoun = ddCountries;
  public ddLoc = ddLocations;
  public textInput;
  public withDropdownRef: IDropdown; //= React.createRef<IDropdown>();
  public withOutDropdownRef: IDropdown;// = React.createRef<IDropdown>();
  // public dropdownRef = React.createRef<IDropdown>();
  // public onSetFocus = () => this.dropdownRef.current!.focus(true);

  public constructor(props: IReportsProps, state: IReportsState) {
    super(props);
    //this.textInput;
    this.handleonClick = this.handleonClick.bind(this);
    this.noVehiclehandleonClick = this.noVehiclehandleonClick.bind(this);
    this.returnError = this.returnError.bind(this);
    this.state = {
      vehicleExist: true,
      //noVehicleBtn: false,
      loadGif: false,
      chkBoxChecked: false,
      userType: "-- Please Select Type of Users --",
      userTypeSelected: '',
      listName: "",
      countries: [],
      countriesSelected: [],
      locations: [],
      locationSelected: [],
      items: []
    };
  }

  // public componentDidMount() {
  //   this.focuswithDropdownRef();
  // }

  // public focuswithDropdownRef(): void {
  //   findDOMNode<HTMLButtonElement>(this.refs.newAction).focus();
  //   this.focuswithDropdownRef.focus();
  // }
  // public componentDidMount() {
  //   // const { componentRef } = this.props;
  //   //   componentRef && componentRef(this);
  // }

  public getfilter(countries, locations): any {
    let filterCountries = ''; let filterLocation = '';
    if (countries !== null) {
      filterCountries = "Country eq " + "'" + countries + "'";
    } else {
      filterCountries = '';
    }
    if (locations !== null) {
      filterLocation = (filterCountries !== '') ? filterCountries + " and Location eq " + "'" + locations + "'" : "Location eq " + "'" + locations + "'";
    } else {
      filterLocation = (filterCountries !== '') ? filterCountries + " and Location eq " + "'" + locations + "'" : "";
    }
    return filterLocation;
  }

  public setListName(res) {
    switch (res) {
      case "All":
        this.setState({
          listName: "All"
        });
        break;
      case "Employees only":
        this.setState({
          listName: "Vehicle Information"
        });
        break;
      case "Contractors only":
        this.setState({
          listName: "Consultant Vehicle Information"
        });
        break;
      case "Guests only":
        this.setState({
          listName: "Guest Vehicle Information"
        });
        break;
    }
  }

  public componentWillMount() {
    this.loadDropDowns();
  }

  public handleChange = (event, type) => {
    switch (type) {
      case "location":
        if (event == "-- Please Select Location --") {
          this.setState({
            locationSelected: ""
          });
        } else {
          this.setState({
            locationSelected: event.text
          });
        }
        break;
      case "country":
        if (event == "-- Please Select Country --") {
          this.setState({
            countriesSelected: ""
          });
        } else {
          this.setState({
            countriesSelected: event.text
          });
        }
        break;
      case "typeofUser":
        if (event == "-- Please Select Type of Users --") {
          this.setState({
            userTypeSelected: "",
            items: [],
            listName: ""
          });
        } else {
          this.setState({
            userTypeSelected: event.text
          });
          this.setListName(event.text);
        }
        break;
      case "noVehicleTypeUser":
        if (event == "-- Please Select Type of Users --") {
          this.setState({
            userTypeSelected: "",
            items: [],
            listName: ""
          });
        } else {
          this.setState({
            userTypeSelected: event.text
          });
          this.setNoVehileListName(event.text);
        }
        break;
    }
  }

  public handleonClick() {
    event.preventDefault();
    this.setState({ loadGif: true });
    let countries = this.state.countriesSelected.text !== undefined ? this.state.countriesSelected.text : null;
    let locations = this.state.locationSelected.text !== undefined ? this.state.locationSelected.text : null;
    if (this.state.listName !== "") {
      let filter = this.getfilter(countries, locations);
      if (this.state.listName !== "All") {
        this.getListItems(this.state.listName, filter);
      }
      else {
        this.getAll(filter);
      }

    } else {
      this.returnError(this.state.listName);
    }
  }

  public returnError(res) {

    if (res !== "Initial Load") {
      this.errorComponent = <div className={restyles.container}>
        <Error />
      </div>;
      return this.errorComponent;
    }
    else {
      this.errorComponent = null;
      return this.errorComponent;
    }
  }

  public getListItems(listName, filter): any {
    if (this.state.items.length !== 0) {
      this.setState({ items: [] });
    }
    let selectColumns = (listName == "Vehicle Information") ? EmployeeColumns : ((listName == "Consultant Vehicle Information") ? ConsultentColumns : GuestColumns);
    sp.web.lists.getByTitle(listName).items.select(selectColumns).filter(filter).getAll(4000).then(d => {
      console.log("List Name:- " + listName + "  Data Response :-" + d);
      this.setState({ loadGif: false, items: d });
    });
  }

  public getAll(filter): any {
    let allItems = [];
    let allListies = ["Vehicle Information", "Consultant Vehicle Information", "Guest Vehicle Information"];
    for (let index = 0; index < allListies.length; index++) {
      const listName = allListies[index];
      sp.web.lists.getByTitle(listName).items.select().filter(filter).getAll(4000).then(d => {
        allItems.push(d);
        if (allItems.length == 3) {
          allItems = [...allItems[0], ...allItems[1], ...allItems[2]];
          this.setState({ loadGif: false, items: allItems });
        }
      });
    }
  }

  public onCheckBoxSelected = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
    let checked = `${isChecked}`;
    console.log(`The option has been changed to ` + checked + '.');
    this.setState({
      chkBoxChecked: checked, vehicleExist: !checked,
      items: [], userType: "-- Please Select Type of Users --",
      userTypeSelected: ''
    });
    if (!checked) {
      alert(this.withDropdownRef);
    }
    else {
      alert(this.withOutDropdownRef);
    }
  }

  public render(): React.ReactElement<IReportsProps> {
    this.errorComponent = this.returnError("Initial Load");
    return (
      <div className={restyles.reports}>
        <div className={restyles.container}>
          <div className={restyles.row}>
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                  {(this.state.chkBoxChecked == "true") ? this.publickDDTypes(true) : this.publickDDTypes(false)}
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                  <Label className={restyles.lblstyle}>Country</Label>
                  <Dropdown
                    defaultSelectedKey="-- Please Select Country --"
                    options={this.ddCoun}
                    onChanged={((val) => this.handleChange(val, "country"))}
                  />
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                  <Label className={restyles.lblstyle}>Location</Label>
                  <Dropdown
                    //ref={(ref) => this.locationSelect = ref}
                    // getSnapshotBeforeUpdate
                    defaultSelectedKey="-- Please Select Location --"
                    options={this.ddLoc}
                    onChanged={((val) => this.handleChange(val, "location"))}
                  />
                </div>
              </div>
            </div>
            <div className={restyles.empty}>&nbsp;</div>
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                  {/* <input type="checkbox" name="vehicle1" value="Bike" className={styles.checkStyl}/>
                 <span>Please select the check box to generate users with no vehicle information</span><br/> */}
                  <Checkbox
                    label="Please select the check box to generate users with no vehicle information"
                    styles={checkBoxCustomStyles}
                    onChange={this.onCheckBoxSelected}
                  />
                  {/* <NoVehicle /> */}
                </div>
              </div>
            </div>
            <div className={restyles.empty}>&nbsp;</div>
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                  {(this.state.chkBoxChecked == "true") ? this.btnType(true) : this.btnType(false)}
                  {/* <Button buttonType={ButtonType.primary}
                    iconProps={{ iconName: 'ReportDocument' }}
                    disabled={(this.state.userTypeSelected.length) == 0}
                    onClick={this.handleonClick}>
                    Generate Reports
                </Button> */}
                </div>
              </div>
            </div>
            <div>
              {this.errorComponent}
            </div>
          </div>
        </div>
        <div className={restyles.empty}>&nbsp;</div>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              {this.state.loadGif ? <img src="/sites/Dev1/SiteAssets/Reports/Loading.gif" /> : null}
            </div>
          </div>
        </div>
        <div className={restyles.empty}>&nbsp;</div>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">

            </div>
          </div>
        </div>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <All vehicles={this.state.items} vehicleExist={this.state.vehicleExist} />
          </div>
        </div>
      </div>
    );
  }

  public btnType(res) {
    let htmlChunk;
    if (!res) {
      htmlChunk = <React.Fragment>
        <Button buttonType={ButtonType.primary}
          iconProps={{ iconName: 'ReportDocument' }}
          disabled={(this.state.userTypeSelected.length) == 0}
          onClick={this.handleonClick}>
          Vehicle Reports
                </Button>
      </React.Fragment>;
    } else {
      htmlChunk = <React.Fragment>
        <Button buttonType={ButtonType.primary}
          iconProps={{ iconName: 'ReportDocument' }}
          disabled={(this.state.userTypeSelected.length) == 0}
          onClick={this.noVehiclehandleonClick}>
          No Vehicle Reports
                </Button>
      </React.Fragment>;
    }
    return htmlChunk;
  }

  public noVehiclehandleonClick() {
    this.setState({ loadGif: true });
    event.preventDefault();
    let countries = this.state.countriesSelected.text !== undefined ? this.state.countriesSelected.text : null;
    let locations = this.state.locationSelected.text !== undefined ? this.state.locationSelected.text : null;
    if (this.state.listName !== "") {
      let filter = this.getfilter(countries, locations);
      if (this.state.listName !== "All") {
        this.geNoVehicleListItems(this.state.listName, filter);
      }
      else {
        this.getNoVehicleAll(filter);
      }

    } else {
      this.returnError(this.state.listName);
    }
  }

  public getNoVehicleAll(filter): any {
    let allItems = [];
    let allListies = ["employee with out Vehicle Information", "consultants with out Vehicle Information"];
    for (let index = 0; index < allListies.length; index++) {
      const listName = allListies[index];
      sp.web.lists.getByTitle(listName).items.select().filter(filter).getAll(4000).then(d => {
        allItems.push(d);
        if (allItems.length == 2) {
          allItems = [...allItems[0], ...allItems[1]];
          this.setState({ loadGif: false, items: allItems });
        }
      });
    }
  }

  public geNoVehicleListItems(listName, filter) {
    if (this.state.items.length !== 0) {
      this.setState({ items: [] });
    }
    let selectColumns = (listName == "employee with out Vehicle Information") ? NoVehicleEmployeeColumns : ((listName == "consultants with out Vehicle Information") ? NoVehicleConsultentColumns : '');
    sp.web.lists.getByTitle(listName).items.select(selectColumns).filter(filter).getAll(4000).then(d => {
      console.log("List Name:- " + listName + "  Data Response :-" + d);
      this.setState({ loadGif: false, items: d });
    });
  }

  public setNoVehileListName(res) {
    switch (res) {
      case "All":
        this.setState({
          listName: "All"
        });
        break;
      case "Employees only":
        this.setState({
          listName: "employee with out Vehicle Information"
        });
        break;
      case "Contractors only":
        this.setState({
          listName: "consultants with out Vehicle Information"
        });
        break;
    }
  }

  public loadDropDowns(): any {
    sp.web.lists.getByTitle("Country").items.select("ID", "Title").orderBy("Title", true).get().then(d => {
      for (let index = 0; index < d.length; index++) {
        let obj = {
          key: d[index].Title, text: d[index].Title
        };
        this.ddCoun.push(obj);
      }
      console.log(this.ddCoun);
    });
    sp.web.lists.getByTitle("Location").items.select("ID", "Title").orderBy("Title", true).get().then(d => {
      for (let index = 0; index < d.length; index++) {
        let obj = {
          key: d[index].Title, text: d[index].Title
        };
        this.ddLoc.push(obj);
      }
      console.log(this.ddLoc);
    });
  }


  public publickDDTypes(res) {
    let htmlChunk;
    if (!res) {
      htmlChunk = <React.Fragment>
        <Label className={restyles.lblstyle}>Employees Type With Vehicle</Label>
        <Dropdown
          //componentRef={(input) => this.withDropdownRef = input}
          //innerRef
          //componentRef={this.dropdownRef}
          defaultSelectedKey={dropdownOption[0].key}
          options={dropdownOption}
          onChanged={((val) => this.handleChange(val, "typeofUser"))}
        />
      </React.Fragment>;
    } else {
      htmlChunk = <React.Fragment>
        <Label className={restyles.lblstyle}>Employees Type Without Vehicle</Label>
        <Dropdown
          //componentRef={this.withOutDropdownRef}
          defaultSelectedKey={noVehicledropdownOption[0].key}
          options={noVehicledropdownOption}
          onChanged={((val) => this.handleChange(val, "noVehicleTypeUser"))}
        />
      </React.Fragment>;
    }
    return htmlChunk;
  }

}




{/* <Dropdown
  label='Basic example:'
  onChange={this.handleChange("onChange called")}
  options={
    [
      { key: '-- Please Select Type of Users --', text: '-- Please Select Type of Users --', isSelected: true },
      { key: 'All', text: 'All' },
      { key: 'Employees only', text: 'Employees only', },
      { key: 'Contractors only', text: 'Contractors only' },
      { key: 'Guests only', text: 'Guests only' }
    ]
  }
/>
  <Dropdown value={this.state.selectValue} onChange={this.handleChange}>
    <option value="-- Please Select Type of Users --">-- Please Select Type of Users --</option>
    <option value="Orange">Orange</option>
    <option value="Radish">Radish</option>
    <option value="Cherry">Cherry</option>
  </Dropdown> 

let checkboxStyles: ICheckboxStyles = {      
      checkbox: { color: '#FFFFFF', borderColor: '#FFFFFF!important' },
      checkmark: { color: '#FFFFFF' },
      text: { color: '#FFFFFF' },
      textHovered: { color: '#FFFFFF' },
      textFocused: { color: '#FFFFFF' },
      checkboxCheckedHovered: { color: '#FFFFFF', borderColor: '#FFFFFF!important' },
      checkboxCheckedFocused: { color: '#FFFFFF', borderColor: '#FFFFFF!important' },
      checkboxChecked: { color: '#FFFFFF', borderColor: '#FFFFFF!important' },
    };


*/}