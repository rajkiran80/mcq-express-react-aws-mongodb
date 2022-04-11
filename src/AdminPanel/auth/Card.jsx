import cardCss from './Card.module.css'

const Card=({animate,children})=>{
    const animateStyle={transition:"all 0.5s",visibility:"visible",opacity:"1",transform:"scale(1)"}
    const invisible={visibility:"hidden",opacity:"0",maxWidth:"0",maxHeight:"0",transform:"scale(0.5)"}
    return (
        <div className={cardCss.card} style={animate ? animateStyle:invisible}>
             <h3>WELCOME TO ADMIN PANEL</h3>
             {children}
        </div>
    )
}
export default Card