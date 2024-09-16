declare module 'ipinfo' {
    interface IpInfo {
      ip: string;
      hostname?: string;
      city?: string;
      region?: string;
      country?: string;
      loc?: string;
      org?: string;
      postal?: string;
      timezone?: string;
    }
  
    type IpInfoCallback = (err: Error | null, info: IpInfo) => void;
  
    function ipinfo(ip: string, callback: IpInfoCallback): void;
  
    export = ipinfo;
  }