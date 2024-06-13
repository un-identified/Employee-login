import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react';
import { CChartDoughnut } from '@coreui/react-chartjs';
import randomColor from 'randomcolor';

const Charts = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchTagCount = async () => {
      try {
        const response = await axios.get('https://rmbackend.vercel.app/auth/tag_count');
        const tags = response.data;
        const labels = tags.map(tag => tag.tag);
        const data = tags.map(tag => tag.count);

      
        const colors = randomColor({
          count: labels.length,
          luminosity: 'bright',
        });

        setChartData({
          labels: labels,
          datasets: [
            {
              backgroundColor: colors,
              data: data,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching tag counts:', error);
      }
    };

    fetchTagCount();
  }, []);

  const options = {
    plugins: {
      legend: {
        position: 'right', 
      },
    },
  };

  return (
    <CRow>
      <CCol>
        <CCard className="my-1 tw-h-full">
          <CCardHeader>Doughnut Chart</CCardHeader>
          <CCardBody className="d-flex justify-content-center">
            <CChartDoughnut data={chartData} options={options} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Charts;
