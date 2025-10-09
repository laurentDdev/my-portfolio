import * as React from 'react';

interface Props {
    fromMail: string;
    content: string;
}

const EmailTemplate = ({ fromMail, content }: Props) => {
    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                lineHeight: '1.6',
                color: '#333333',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
            }}
        >
            {/* En-tête */}
            <div
                style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '0',
                    borderBottom: '1px solid #eaeaea',
                    marginBottom: '20px',
                }}
            >
                <h1
                    style={{
                        color: '#2c3e50',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        margin: '0',
                    }}
                >
                    Nouveau message
                </h1>
            </div>

            {/* Contenu principal */}
            <div style={{ padding: '0 10px' }}>
                <p style={{ fontSize: '16px', margin: '0 0 20px 0' }}>
                    Bonjour,
                </p>

                <p style={{ fontSize: '16px", margin: "0 0 20px 0' }}>
                    Vous avez reçu un nouveau message depuis votre site web :
                </p>

                {/* Section expéditeur */}
                <div
                    style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderLeft: '4px solid #3498db',
                        marginBottom: '20px',
                    }}
                >
                    <p style={{ fontSize: '14px", margin: "0 0 5px 0', color: '#7f8c8d' }}>
                        <strong>Expéditeur :</strong>
                    </p>
                    <p style={{ fontSize: '16px", margin: "0' }}>
                        {fromMail}
                    </p>
                </div>

                {/* Section message */}
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #eaeaea',
                        padding: '15px',
                        marginBottom: '20px',
                    }}
                >
                    <p style={{ fontSize: '14px", margin: "0 0 10px 0', color: '#7f8c8d' }}>
                        <strong>Message :</strong>
                    </p>
                    <p
                        style={{
                            fontSize: '16px',
                            margin: '0',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        {content}
                    </p>
                </div>

                {/* Pied de page */}
                <div
                    style={{
                        marginTop: '30px',
                        paddingTop: '20px',
                        borderTop: '1px solid #eaeaea',
                        fontSize: '12px',
                        color: '#7f8c8d',
                        textAlign: 'center',
                    }}
                >
                    <p style={{ margin: '0' }}>
                        Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplate;
