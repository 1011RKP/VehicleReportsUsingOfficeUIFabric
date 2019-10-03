import * as React from 'react';
import styles from './all.module.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ExporttoExcel } from '../ExportToExcel/export';
import { HTMLColumnsWithVehicle, HTMLColumnsWithOutVehicle } from '../Common/Model';
import 'office-ui-fabric-react/dist/css/fabric.css';
// import './fabriccomponent.css';
import 'core-js/es6/number';
import 'core-js/es6/array';

export class All extends React.Component<any, any>{

  public constructor(props: any, state: any) {
    super(props);
    this.htmlPanel = this.htmlPanel.bind(this);
  }

  public htmlPanel() {
    const count = this.props.vehicles.length;
    let vehicleExist = (!(this.props.vehicleExist) ? HTMLColumnsWithOutVehicle : HTMLColumnsWithVehicle);
    if (count != 0) {
      let bdy = <div className={styles.container}>
        <div className={styles.exportRow}>
          <ExporttoExcel data={this.props.vehicles} />
        </div>
        <div className={styles.exportRow}>
          <ReactTable
            columns={vehicleExist}
            data={this.props.vehicles}
            showPaginationTop={true}
            noDataText={"Please Wait"}
            defaultPageSize={5}
          >
          </ReactTable>
        </div>
      </div>;
      return bdy;
    }
  }

  public render(): React.ReactElement<any> {
    // let vehicles: any = this.props;
    // console.log(vehicles);
    var finalDom = this.htmlPanel();

    return (
      <div className={styles.all}>

        {finalDom}
      </div>
    );
  }
}

{/* 


 <table className={styles.msTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>VehicleColor</th>
              <th>VehicleMake</th>
              <th>VehicleModel</th>
              <th>VehicleStateCode</th>
              <th>VehicleTag</th>
              <th>VehicleYear</th>
              <th>IncyteEmployee</th>
              <th>Intern</th>
              <th>RegisteredInUSA</th>
              <th>NonUSRegistered</th>
            </tr>
          </thead>
          <tbody>
            {this.props.vehicles.map((i, k) =>
              <tr>
                <td>{i.Title}</td>
                <td>{i.VehicleColor}</td>
                <td>{i.VehicleModel}</td>
                <td>{i.VehicleMake}</td>
                <td>{i.VehicleStateCode}</td>
                <td>{i.VehicleTag}</td>
                <td>{i.VehicleYear}</td>
                <td>{i.IncyteEmployee}</td>
                <td>{i.Intern}</td>
                <td>{i.RegisteredInUSA}</td>
                <td>{i.NonUSRegistered}</td>
              </tr>
            )}
          </tbody>
 </table>


*/}