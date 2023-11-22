import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell,  ResponsiveContainer, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState("");
  const colors= ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD'];

  useEffect(() => {
    setData(getData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [`${events}`]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter(event => event.summary.includes(genre));
      return {
        name: genre,
        value: filteredEvents.length
      }
    })
    return data;
  };

  //this function does the math for the percentages for each separate label
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          fill="#8884d8"
          label={renderCustomizedLabel}
          outerRadius={130}
        >
          {/*Whenever this data.map stops working, if I put brackets around data, `[data]` and then save,
          and then take the brackets off and save, it correctly displays the color of each piece of the pie.
          However, when I reload the page it then throws an error. I can't figure out why this is.*/}
          {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))} */}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;