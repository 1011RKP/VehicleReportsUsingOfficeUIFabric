import * as React from 'react';
import styles from './error.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

export class Error extends React.Component<any, any>{
    public constructor(props: any, state: any) {
        super(props);
    }
    public render(): React.ReactElement<any> {
        return (
            <React.Fragment>
                <MessageBar
                    messageBarType={MessageBarType.error}>
                    Oops! This is error
                </MessageBar>

                />
            </React.Fragment>
        );
    }

}