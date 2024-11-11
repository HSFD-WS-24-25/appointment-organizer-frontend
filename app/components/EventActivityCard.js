import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';


export default function PageViewsBarChart() {
  

  return (
    <Card variant="outlined" sx = {{height: '100%', width: "100%"}} >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Events Created
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              80
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          
        </Stack>
        <BarChart
          borderRadius={8}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            },
          ]}
          series={[
            {
              id: 'events-created',
              label: 'Events Created',
              data: [2234, 3872, 2998, 4125, 3357, 2789, 2998],
              stack: 'A',
            }
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
