import React, { useState, useRef } from 'react';
import ReExt from '@sencha/reext';

const App = () => {
  const [row, setRow] = useState(null);
  const [direction, setDirection] = useState('row');
  const directionRef = useRef();
  directionRef.current = direction;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <h1>Hello, React with Vite and ReExt!</h1>
      <div style={{ height: '60px' }}>
        <ReExt xtype='logo' />
      </div>
      <div style={{ height: '30px', display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
        <ReExt xtype='button'
          style={{ width: '100px', height: '30px', marginRight: '10px' }}
          config={{ text: direction, width: '100%' }}
          onClick={() => {
            if (directionRef.current === 'row') { setDirection('column'); } else { setDirection('row'); }
          }} />
      </div>
      <div style={{ display: 'flex', flexDirection: direction, overflow: 'auto', flex: 1 }}>
        <ReExt xtype='gridpanel'
          style={{ flex: direction === 'row' ? 1 : 'none', width: direction === 'row' ? '60%' : '100%', height: direction === 'row' ? '100%' : 'auto', overflow: 'auto' }}
          config={{
            title: 'Users Grid',
            height: '100vh',
            tbar: ['->', {
              text: 'Refresh',
              iconCls: 'fa fa-sync',
              handler: function () {
                Ext.Msg.alert('Hello', 'Hello Everybody');
              }
            }, {
              text: 'New User',
              iconCls: 'fa fa-plus'
            }],
            bbar: {
              xtype: 'pagingtoolbar',
              displayInfo: true
            },
            columns: [
              { text: "User ID", dataIndex: "id", width: 120 },
              { text: "First Name", dataIndex: "name", width: 200 },
              { text: "Last Name", dataIndex: "username", width: 200 },
              { text: "Email", dataIndex: "email", width: 200 }
            ],
            store: {
              proxy: {
                type: 'rest',
                url: 'https://jsonplaceholder.typicode.com/users',
                reader: {
                  type: 'json',
                  rootProperty: ''
                }
              },
              autoLoad: true,
              // remoteSort: true, // backend sorting better when data is huge
              // remoteFilter: true // backend filtering better when data is huge
            }
          }}
          onSelect={(grid, selected) => {
            var row;
            if (selected[0] === undefined) { row = selected.data; } else { row = selected[0].data; }
            setRow(row);
          }} />
        <div style={{ width: direction === 'row' ? '300px' : '100%', padding: '10px', border: '1px solid gray', overflow: 'auto', flex: direction === 'row' ? 'none' : 1 }}>
          <ReExt xtype='displayfield' style={{border: '1px solid lightgray', marginBottom: '10px'}} config={{ value: `User ID: ${row === null ? '' : row.id}` }} />
          <ReExt xtype='displayfield' style={{border: '1px solid lightgray', marginBottom: '10px'}} config={{ value: `First Name: ${row === null ? '' : row.name}` }} />
          <ReExt xtype='displayfield' style={{border: '1px solid lightgray', marginBottom: '10px'}} config={{ value: `Last Name: ${row === null ? '' : row.username}` }} />
          <ReExt xtype='displayfield' style={{border: '1px solid lightgray'}} config={{ value: `Email: ${row === null ? '' : row.email}` }} />
        </div>
      </div>
    </div>
  );
};

export default App;