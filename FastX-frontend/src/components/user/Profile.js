import React, { useEffect, useState } from 'react';
import { Typography, Button, Modal, Form, Input, Select, message, Spin } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const token = localStorage.getItem('token');
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const userId = loggedUser?.userId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Failed to load user data");
        setLoading(false);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const showModal = () => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      gender: user.gender,
      contactNumber: user.contactNumber,
      role: user.role,
    });
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleUpdate = async (values) => {
    try {
      const res = await axios.put(`http://localhost:9000/api/users/profile/${userId}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      message.success("Profile updated successfully!");
      setModalVisible(false);
      localStorage.setItem('user', JSON.stringify(res.data)); // Update local storage
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  if (loading) return <Spin size="large" style={{ display: 'block', margin: 'auto', padding: 40 }} />;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, background: '#f8f3fb', borderRadius: 12, boxShadow: '0 8px 24px rgba(107,0,140,0.1)' }}>
      <Title level={2} style={{ color: '#6B008C', marginBottom: 24 }}>My Profile</Title>
      {user && (
        <>
          <Text strong>Name: </Text><Text>{user.name}</Text><br />
          <Text strong>Email: </Text><Text>{user.email}</Text><br />
          <Text strong>Gender: </Text><Text>{user.gender}</Text><br />
          <Text strong>Contact Number: </Text><Text>{user.contactNumber}</Text><br />
          <Text strong>Role: </Text><Text>{user.role}</Text><br />

          <Button type="primary" style={{ marginTop: 24 }} onClick={showModal}>Update Profile</Button>

          <Modal
            title="Update Profile"
            visible={modalVisible}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText="Save Changes"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdate}
              initialValues={{
                name: user.name,
                email: user.email,
                gender: user.gender,
                contactNumber: user.contactNumber,
                role: user.role,
              }}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Enter a valid email' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select your gender' }]}
              >
                <Select>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="contactNumber"
                label="Contact Number"
                rules={[
                  { required: true, message: 'Please enter contact number' },
                  { pattern: /^\d{10}$/, message: 'Contact number must be 10 digits' }
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>

              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select your role' }]}
              >
                <Select disabled>
                  <Option value="passenger">Passenger</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="bus operator">Bus Operator</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Profile;
