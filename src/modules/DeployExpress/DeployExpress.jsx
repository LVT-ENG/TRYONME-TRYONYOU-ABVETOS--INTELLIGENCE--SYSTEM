import React, { useState } from 'react';
import { deployAPI, agent70API } from '../QAPI';

export function useDeployExpress() {
  const [state, setState] = useState({
    deployments: [],
    currentDeployment: null,
    status: 'idle',
  });

  const triggerDeploy = async (config) => {
    setState(prev => ({ ...prev, status: 'deploying' }));
    
    try {
      // Step 1: Request Agent70 authorization
      const auth = await agent70API.authorize(Date.now(), true);
      
      // Step 2: Trigger deployment
      const result = await deployAPI.trigger(config);
      
      setState(prev => ({
        ...prev,
        currentDeployment: result.data,
        deployments: [...prev.deployments, result.data],
        status: 'completed',
      }));

      // Step 3: Send notification
      await deployAPI.notify({
        type: 'deployment_complete',
        id: result.data.deploymentId,
        url: 'https://tryonyou.app',
      });

      return result;
    } catch (error) {
      setState(prev => ({ ...prev, status: 'error' }));
      throw error;
    }
  };

  const getStatus = async (deploymentId) => {
    return deployAPI.getStatus(deploymentId);
  };

  return { state, triggerDeploy, getStatus };
}

export default function DeployExpress() {
  const { state, triggerDeploy } = useDeployExpress();
  const [activeTab, setActiveTab] = useState('deploy');

  const deploymentSteps = [
    { step: 1, title: 'Build ZIP', description: 'Generate production build and create ZIP package', icon: '📦' },
    { step: 2, title: 'Push to GitHub', description: 'Commit and push to main branch', icon: '📤' },
    { step: 3, title: 'Vercel Deploy', description: 'Trigger Vercel deployment pipeline', icon: '🚀' },
    { step: 4, title: 'Verify Live', description: 'Confirm deployment and run health checks', icon: '✅' },
    { step: 5, title: 'Notify', description: 'Send status to Telegram @abvet_deploy_bot', icon: '📱' },
  ];

  const handleDeploy = async () => {
    try {
      await triggerDeploy({
        target: 'vercel',
        branch: 'main',
        environment: 'production',
      });
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <div>
            <h1>Deploy Express</h1>
            <p style={{ color: 'var(--color-gray-500)' }}>Automated Deployment Pipeline</p>
          </div>
          <div className={`status status-${state.status === 'deploying' ? 'pending' : state.status === 'error' ? 'error' : 'active'}`}>
            {state.status.toUpperCase()}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)', borderBottom: '1px solid var(--color-gray-800)' }}>
          {['deploy', 'pipeline', 'history', 'notifications'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--spacing-md)',
                color: activeTab === tab ? 'var(--color-neon-cyan)' : 'var(--color-gray-500)',
                borderBottom: activeTab === tab ? '2px solid var(--color-neon-cyan)' : '2px solid transparent',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: 600,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Deploy Tab */}
        {activeTab === 'deploy' && (
          <div className="card">
            <h3>Quick Deploy</h3>
            <p style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--spacing-xl)' }}>
              Deploy your application to production with a single click.
            </p>

            <div style={{ display: 'grid', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span>Target</span>
                <span style={{ color: 'var(--color-neon-cyan)' }}>Vercel Production</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span>Branch</span>
                <span style={{ color: 'var(--color-neon-cyan)' }}>main</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span>Domain</span>
                <span style={{ color: 'var(--color-neon-cyan)' }}>tryonyou.app</span>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleDeploy}
              disabled={state.status === 'deploying'}
              style={{ width: '100%' }}
            >
              {state.status === 'deploying' ? 'Deploying...' : 'Deploy Now'}
            </button>
          </div>
        )}

        {/* Pipeline Tab */}
        {activeTab === 'pipeline' && (
          <div className="card">
            <h3>Deployment Pipeline</h3>
            <div style={{ marginTop: 'var(--spacing-xl)' }}>
              {deploymentSteps.map((step, index) => (
                <div 
                  key={step.step}
                  style={{
                    display: 'flex',
                    gap: 'var(--spacing-lg)',
                    padding: 'var(--spacing-lg)',
                    borderLeft: '2px solid var(--color-gold)',
                    position: 'relative',
                    marginLeft: 'var(--spacing-lg)',
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      left: '-15px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                    }}
                  >
                    {step.step}
                  </div>
                  <div style={{ marginLeft: 'var(--spacing-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                      <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                      <h4 style={{ margin: 0 }}>{step.title}</h4>
                    </div>
                    <p style={{ color: 'var(--color-gray-500)', margin: 'var(--spacing-xs) 0 0 0', fontSize: '0.875rem' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="card">
            <h3>Deployment History</h3>
            {state.deployments.length === 0 ? (
              <p style={{ color: 'var(--color-gray-500)', marginTop: 'var(--spacing-md)' }}>
                No deployments yet. Start by deploying your first build.
              </p>
            ) : (
              <div style={{ marginTop: 'var(--spacing-md)' }}>
                {state.deployments.map((deployment) => (
                  <div 
                    key={deployment.deploymentId}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 'var(--spacing-md)',
                      borderBottom: '1px solid var(--color-gray-800)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>Deployment #{deployment.deploymentId}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
                        {deployment.target} - {deployment.branch}
                      </div>
                    </div>
                    <span className="status status-active">{deployment.status.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="card">
            <h3>Telegram Notifications</h3>
            <p style={{ color: 'var(--color-gray-500)', marginBottom: 'var(--spacing-xl)' }}>
              Configure notifications sent to @abvet_deploy_bot
            </p>

            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span>Build Status</span>
                <span style={{ color: 'var(--color-peacock-green)' }}>✓ Enabled</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span>Commit Hash</span>
                <span style={{ color: 'var(--color-peacock-green)' }}>✓ Enabled</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span>Screenshots</span>
                <span style={{ color: 'var(--color-peacock-green)' }}>✓ Enabled</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-md)', background: 'var(--color-gray-800)', borderRadius: 'var(--radius-md)' }}>
                <span>Error Alerts</span>
                <span style={{ color: 'var(--color-peacock-green)' }}>✓ Enabled</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
