import * as React from 'react';  
import {sp} from '@pnp/sp';  
import styles from './ThirdPartyApi.module.scss'
import { IThirdPartyApiProps } from './IThirdPartyApiProps';  
import { HttpClient, HttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http'; 
export interface IthirdpartyState {    
  ApiOutput?:any[];  
}   
export default class ThirdpartyApi extends React.Component<IThirdPartyApiProps, IthirdpartyState> {  
  constructor(props: IThirdPartyApiProps, state: IthirdpartyState) {  
    super(props);  
    this.state = {  
      ApiOutput: []
    };  
  }  
 
  public componentDidMount(){  
    var myoutput = [];  
    this._getthirdpartyApi()  
    .then(response => {  
      myoutput.push(response);  
      this.setState({ ApiOutput: myoutput });  
    });  
  }
  
  private _getthirdpartyApi(): Promise<any> { 
    const myOptions: ISPHttpClientOptions ={
      headers:  new Headers(),
      method: "POST",
      mode: "cors"
    }
    return this.props.myhttpclient  
    .post(  
      'https://prod-23.westus.logic.azure.com:443/workflows/ce3ee1052e7c4f4b9e6d8ee11af6dd91/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PFr31t_uofDX3CoX6EVWjfPBQiwY6qkhvZr5jKcWrAU', HttpClient.configurations.v1, myOptions 
    )  
    .then((response: HttpClientResponse) => {  
      return response.json();  
    })  
    .then(jsonResponse => {  
      console.log('RESPONSE', jsonResponse);  
      return jsonResponse;  
    }) as Promise<any>;  
  }   
  public render(): React.ReactElement<IThirdPartyApiProps> { 
  
    return( 
      <div >  
        <h1 style={headingStyle}>2020 Top Producers</h1>
        { this.state.ApiOutput[0] && <Bindvalue bindoutput={this.state.ApiOutput[0]} />}  
      </div>  
    );  
  }  
}  
const Bindvalue = (props) => {  
  const Bindedcontent = props.bindoutput.map((httpapi,index) =>
      <tr style={tableRow}>
        <th>{httpapi.Name}</th>
        <th>{httpapi.Percentage}</th>
        <th>{httpapi.url}</th>
      </tr>
  );  
  return (  
    <div>
        <table style={table}>
          <tbody>
          {Bindedcontent}  
          </tbody>
        </table>
    </div>  
    );
} 

const headingStyle = {
  fontWeight: 'bold' as 'bold',
  textDecoration: 'underline' as 'underline'
}

const table = {
  width: '100%',
  borderCollapse: 'collapse' as 'collapse',
  border: '1px solid lightgray'
}

const tableRow = {
  textAlign: 'center' as 'center',
  height: '30px',
  border: '1px solid lightgray'
}