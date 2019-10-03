import * as React from 'react';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import 'office-ui-fabric-react/dist/css/fabric.css';
import {
    Dropdown, IDropdown,
    DropdownMenuItemType,
    IDropdownOption
} from 'office-ui-fabric-react/lib/Dropdown';
import {
    Button, ButtonType
} from 'office-ui-fabric-react/lib/Button';
import nvStyles from './noVehicle.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
    dropdownOption,
    EmployeeColumns,
    ConsultentColumns,
    GuestColumns,
    ddCountries, ddLocations, allColumns, checkBoxCustomStyles
} from '../Common/Model';

export class NoVehicle extends React.Component<any, any>{
    public ddCoun = ddCountries;
    public ddLoc = ddLocations;
    public constructor(props: any, state: any) {
        super(props);
    }

    public handleChange(event, type) {
    }

    public render(): React.ReactElement<any> {
        return (

            <div className={nvStyles.noVehicle}>
                <div className={nvStyles.container}>
                    <div className={nvStyles.row}>
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                                    <Dropdown
                                        defaultSelectedKey="-- Please Select Type of Reports --"
                                        options={dropdownOption}
                                        onChanged={((val) => this.handleChange(val, "typeofUser"))}
                                    />
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                                    <Dropdown
                                        defaultSelectedKey="-- Please Select Country --"
                                        options={this.ddCoun}
                                        onChanged={((val) => this.handleChange(val, "country"))}
                                    />
                                </div>
                                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
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
                        <div className={nvStyles.empty}>&nbsp;</div>
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                    Test
                                </div>
                            </div>
                        </div>
                        <div className={nvStyles.empty}>&nbsp;</div>
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                    {/* < Button buttonType={ButtonType.primary}
                                        disabled={(this.state.userTypeSelected.length) == 0}
                                        onClick={this.handleonClick}>
                                        Generate Reports
                    </Button> */}
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* {this.errorComponent} */}
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

{/* <React.Fragment>
    <MessageBar
        messageBarType={MessageBarType.error}>
        Oops! This is error
                </MessageBar>
    <Checkbox label="Please select the check box to generate users with no vehicle information"
    />
</React.Fragment> */}