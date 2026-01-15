import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css"

export default function InfoBox({info}){
   const IMG="https://www.noaa.gov/sites/default/files/styles/landscape_width_1275/public/legacy/image/2019/Jun/PHOTO-dark%20and%20stormy%20cloudscape-istock-1125x534-Landscape.jpg";
   
   
    return(
        <div className="InfoBox">
             <div className='cardContainer'>
                <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={IMG}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city}
        </Typography>
        <Typography component={"span"} variant="body2" sx={{ color: 'text.secondary' }}>
         <div>Temperature={info.temp}&deg;c</div>
         <br />
         <div>Humidity={info.humidity}</div>
         <p>minTemp={info.tempMin}&deg;c</p>
         <p>maxTemp={info.tempMax}&deg;c</p>
         <p>Weather the fels like={info.feelsLike}&deg;c</p>
        </Typography>
      </CardContent>
     
    </Card>
             </div>

        </div>
    )
}