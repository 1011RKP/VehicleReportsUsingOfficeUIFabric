import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ReportsWebPartStrings';
import Reports from './components/Reports';

import { IReportsProps } from './components/IReportsProps';

export interface IReportsWebPartProps {
  description: string;
  siteurl:string;
  spHttpClient:string;
}

export default class ReportsWebPart extends BaseClientSideWebPart<IReportsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReportsProps > = React.createElement(
      Reports,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
