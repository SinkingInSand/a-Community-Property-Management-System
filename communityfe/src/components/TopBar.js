
import { Button, Typography } from 'antd';

const { Title } = Typography;

function TopBar(props) {
  const { isLoggedIn, handleLogout, asAdmin, userInfo } = props;

  const renderTopbarButton = () => {
    if (asAdmin && isLoggedIn) {
      return (
        <div className="adminPost">
          Admin: {userInfo.username}
          <Button
            type="secondary"
            shape="round"
            size="large"
            style={{ margin: '24px' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    } else if (isLoggedIn && !asAdmin) {
      return (
        <div>
          Resident: {userInfo.username}
          <Button
            type="secondary"
            shape="round"
            size="large"
            style={{ margin: '24px' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      );
    }
  };

  return (
    <header>
      <div
        className={asAdmin ? 'admin-header' : 'App-header'}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Title level={2} style={{ color: 'white', lineHeight: 'inherit' }}>
          Community Management System
        </Title>
        <div className={isLoggedIn ? 'isLogin' : 'logout'}>
          {renderTopbarButton()}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
