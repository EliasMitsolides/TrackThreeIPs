import {Injectable} from '@angular/core';

@Injectable()
export class ThreeIPServiceClient {
    PingAllIPs = () => {
        return fetch(`http://127.0.0.1:5000/ping3`).then(function(response) {
            return response.json()
        })
    }
}