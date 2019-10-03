import * as React from 'react';
import styles from './export.module.scss';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
//import { HTMLColumnsWithVehicle,HTMLColumnsWithOutVehicle } from '../Common/Model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import 'core-js/es6/number';
import 'core-js/es6/array';

export class ExporttoExcel extends React.Component<any, any>{
  public constructor(props: any, state: any) {
    super(props);
    this.exportAsExcelFile = this.exportAsExcelFile.bind(this);
  }

  public fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  public fileExtension = '.xlsx';

  public exportAsExcelFile(res, fileName: string): void {
    const ws = XLSX.utils.json_to_sheet(res);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  public render(): React.ReactElement<any> {
    let vehicleDetailes: any = this.props;
    console.log(vehicleDetailes);

    return (
      <div className={styles.export}>
        <button className={styles.downloadxlsbutton}
          onClick={(e) => this.exportAsExcelFile(vehicleDetailes.data, "Vehicle Reports")}>
          Download Reports
        </button>
      </div>
    );
  }



}


{/* <ReactHTMLTableToExcel
  className={styles.downloadxlsbutton}
  table="tabletoxls"
  filename="Reports"
  sheet="tablexls"
  buttonText="Download as Reports" />
  <table id="tabletoxls" className={styles.hideTbl}>
    <thead>
      <tr>
        {
          HTMLColumns.map((i, k) =>
            <th>{i.Header}</th>
          )}
      </tr>
    </thead>
    <tbody>
      {vehicleDetailes.data.map((i, k) =>
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
          <td>{i.Location}</td>
          <td>{i.Country}</td>
        </tr>
      )}
    </tbody>
  </table> */}