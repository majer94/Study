package diary;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

// Ctrl + Shift + 'F' : 소스코드를 보기 좋게 정렬해주는 기능

public class DiaryMain extends JFrame {

	private JTextField textField_id;
	private JTextField textField_pw;

	public DiaryMain() {
		// Ctrl + Shift + f (자동정리)
		setTitle("나의 일기장 시작화면");

		setSize(580, 600);
		getContentPane().setLayout(null);

		JLabel lblNewLabel_diary = new JLabel("");
		lblNewLabel_diary.setIcon(new ImageIcon("diary.png"));
		lblNewLabel_diary.setBounds(12, 10, 534, 388);
		getContentPane().add(lblNewLabel_diary);

		JLabel lblNewLabel_1 = new JLabel("아이디");
		lblNewLabel_1.setHorizontalAlignment(SwingConstants.RIGHT);
		lblNewLabel_1.setBounds(361, 403, 57, 15);
		getContentPane().add(lblNewLabel_1);

		textField_id = new JTextField();
		textField_id.setBounds(430, 400, 116, 21);
		getContentPane().add(textField_id);
		textField_id.setColumns(10);

		JLabel lblNewLabel_2 = new JLabel("패스워드");
		lblNewLabel_2.setHorizontalAlignment(SwingConstants.RIGHT);
		lblNewLabel_2.setBounds(361, 430, 57, 15);
		getContentPane().add(lblNewLabel_2);

		textField_pw = new JTextField();
		textField_pw.setBounds(430, 427, 116, 21);
		getContentPane().add(textField_pw);
		textField_pw.setColumns(10);

		JButton btnLogin = new JButton("Login");
		btnLogin.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String sId = "root";
				String sPw = "1234";

				String iId = textField_id.getText();
				String iPw = textField_pw.getText();

				if (sId.equals(iId)) {

					if (sPw.equals(iPw)) {
						JOptionPane.showMessageDialog(rootPane, "Login OK");

						MyDiary md = new MyDiary();

					} else {
						JOptionPane.showMessageDialog(rootPane, "패스워드가 틀립니다. 다시 입력해주세요");
					}

				} else {
					System.out.println(iId);
					System.out.println(sId);
					JOptionPane.showMessageDialog(rootPane, "아이디가 존재하지 않습니다. 다시 입력해주세요");
				}
			}
		});
		btnLogin.setBackground(Color.ORANGE);
		btnLogin.setBounds(409, 455, 69, 23);
		getContentPane().add(btnLogin);

		JButton btnNewButton = new JButton("Reset");
		btnNewButton.setForeground(Color.LIGHT_GRAY);
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				textField_id.setText("");
				textField_pw.setText("");
			}
		});
		btnNewButton.setBackground(Color.DARK_GRAY);
		btnNewButton.setBounds(481, 455, 68, 22);
		getContentPane().add(btnNewButton);

		setVisible(true);

	}

	public static void main(String[] args) {

		DiaryMain diary = new DiaryMain();

	}
}
