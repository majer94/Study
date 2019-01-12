package diary;

import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.ImageIcon;

public class MyDiary extends JFrame {
	private JTextField textField;
	public MyDiary() {
		getContentPane().setLayout(null);
		
		JButton btnNewButton = new JButton("저장하기");
		btnNewButton.setBounds(12, 204, 97, 23);
		getContentPane().add(btnNewButton);
		
		JButton btnNewButton_1 = new JButton("읽어오기");
		btnNewButton_1.setBounds(133, 204, 97, 23);
		getContentPane().add(btnNewButton_1);
		
		textField = new JTextField();
		textField.setBounds(86, 111, 116, 21);
		getContentPane().add(textField);
		textField.setColumns(10);
		
		JLabel no = new JLabel("번호");
		no.setBounds(22, 114, 57, 15);
		getContentPane().add(no);
		
		JLabel lblNewLabel = new JLabel("");
		lblNewLabel.setIcon(new ImageIcon("C:\\Users\\pc\\Desktop\\title.png"));
		lblNewLabel.setBounds(12, 10, 410, 89);
		getContentPane().add(lblNewLabel);
	}
	setSize(300,600);
	setVisible(true));
}
