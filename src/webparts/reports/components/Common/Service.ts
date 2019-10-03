import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { IReportsProps } from '../IReportsProps';
import { Component } from 'react';


export class service extends React.Component<IReportsProps, any> {
    // public constructor(props: IReportsProps) {
    //     super(props);
    // }

    public _getEvents(restFullURL) {
        console.log(restFullURL);
        return this.props.spHttpClient.get(restFullURL, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                response.json().then((responseJSON: any) => {
                    console.log(responseJSON);
                });
            });
    }
}