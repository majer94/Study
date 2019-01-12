package menu;

import javax.swing.JFrame;
import java.awt.FlowLayout;
import javax.swing.JLabel;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.ImageIcon;
import java.awt.event.ActionListener;
import java.text.Format;
import java.awt.event.ActionEvent;
import java.awt.Color;
import javax.swing.SwingConstants;

public class ChinaFood extends JFrame {
	private JTextField 	textCount;
	private JTextField	textTotal;
	private JLabel		lblLabel_image;
	
	int	count = 0;
	int	total = 0;
	final int price = 5000;
	String s_count, s_total;
	

	public	ChinaFood() {
		getContentPane().setBackground(new Color(204, 255, 153));
		setSize(600, 460);
		setTitle("주문하세요");
		getContentPane().setLayout(new FlowLayout(FlowLayout.CENTER, 5, 5));
		
		JButton btnNewButton = new JButton("짬뽕");
		btnNewButton.setForeground(Color.MAGENTA);
		btnNewButton.setBackground(Color.ORANGE);
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				count++;
				s_count = String.format("%d", count);
				textCount.setText(""+count);

				total = count*price;
				s_total = String.format("%,d", total);
				
				textTotal.setText(s_total);
				lblLabel_image.setIcon(new ImageIcon("m1.png"));
				
				getContentPane().setBackground(Color.gray);
			}
		});
		getContentPane().add(btnNewButton);
		
		JButton btnNewButton_1 = new JButton("우동");
		btnNewButton_1.setForeground(Color.MAGENTA);
		btnNewButton_1.setBackground(Color.GREEN);
		btnNewButton_1.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				count++;
				textCount.setText(""+count);

				total = count*price;
				s_total = String.format("%,d", total);
				
				textTotal.setText(s_total);
				lblLabel_image.setIcon(new ImageIcon("m2.png"));
				
				getContentPane().setBackground(Color.gray);

			}
		});
		getContentPane().add(btnNewButton_1);
		
		JButton btnNewButton_2 = new JButton("짜장");
		btnNewButton_2.setForeground(Color.MAGENTA);
		btnNewButton_2.setBackground(Color.CYAN);
		btnNewButton_2.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				count++;
				
				s_count = String.format("%d", count);
				textCount.setText(s_count);

				total = count*price;
				s_total = String.format("%,d", total);
				
				textTotal.setText(s_total);
				lblLabel_image.setIcon(new ImageIcon("m3.png"));
				
				getContentPane().setBackground(Color.gray);

			}
		});
		getContentPane().add(btnNewButton_2);
		
		JLabel lblNewLabel_1 = new JLabel("개수");
		getContentPane().add(lblNewLabel_1);
		
		textCount = new JTextField();
		textCount.setHorizontalAlignment(SwingConstants.RIGHT);
		textCount.setForeground(Color.BLUE);
		getContentPane().add(textCount);
		textCount.setColumns(10);
		
		JLabel lblNewLabel_2 = new JLabel("금액");
		getContentPane().add(lblNewLabel_2);
		
		textTotal = new JTextField();
		textTotal.setHorizontalAlignment(SwingConstants.RIGHT);
		textTotal.setForeground(Color.RED);
		getContentPane().add(textTotal);
		textTotal.setColumns(10);
		
		lblLabel_image = new JLabel("");
		lblLabel_image.setIcon(new ImageIcon("china.png"));
		getContentPane().add(lblLabel_image);
		
		setVisible(true);
	}
	
	public static void main(String[] args) {

		ChinaFood china = new ChinaFood();
		
	}

	
}
