declare module "react-stars" {
    import { Component } from "react";
  
    interface ReactStarsProps {
        count?: number 
        value?: number 
        size?: number
        color1?: string
        color2?: string
        half?: boolean
        edit?: boolean
        onChange?: (newRating: number) => void
    }
  
    export default class ReactStars extends Component<ReactStarsProps> {}
}
  