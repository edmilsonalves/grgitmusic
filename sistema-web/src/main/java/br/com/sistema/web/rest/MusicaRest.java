/**
 * Edmilson.Reis
 */
package br.com.sistema.web.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.sistema.web.entity.Artista;
import br.com.sistema.web.entity.Musica;
import br.com.sistema.web.exception.BusinessException;
import br.com.sistema.web.response.BaseResponse;
import br.com.sistema.web.service.IArtistaService;
import br.com.sistema.web.service.IMusicaService;
import br.com.sistema.web.util.SUtils;

/**
 * @author edmilson.reis
 *
 */
@RestController
@RequestMapping("/rest")
public class MusicaRest {

	@Autowired
	private IMusicaService musicaService;

	@Autowired
	private IArtistaService artistaService;

	@CrossOrigin
	@RequestMapping(value = "/musicas/pesquisa", method = RequestMethod.GET)
	public ResponseEntity<?> pesquisa(@RequestParam(required = false) String query) {
		BaseResponse response = new BaseResponse();

		try {

			List<Musica> list = new ArrayList<Musica>();

			if (!SUtils.isNullOrEmpty(query)) {
				list = this.musicaService.findByNomeMusicaContaining(query);
			} else {
				list = this.musicaService.findAll();
			}

			response.setDataList(list);
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Consulta realizada com sucesso.");
		} catch (BusinessException e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@CrossOrigin
	@RequestMapping(value = "/musicas", method = RequestMethod.GET)
	public ResponseEntity<?> listar() {
		BaseResponse response = new BaseResponse();

		try {

			response.setDataList(this.musicaService.findAll());
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (BusinessException e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@RequestMapping(value = "/musicas/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> buscar(@PathVariable("id") Long id) {
		BaseResponse response = new BaseResponse();

		try {

			Musica musica = this.musicaService.findBy(id);
			response.setEntity(musica);

		} catch (BusinessException e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@CrossOrigin
	@RequestMapping(value = "/musicas", method = RequestMethod.POST)
	public ResponseEntity<?> save(@RequestBody Musica musica) {
		BaseResponse response = new BaseResponse();

		try {

			this.musicaService.save(musica);
			response.setDataList(this.musicaService.findAll());
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Operação realizada com sucesso.");

		} catch (Exception e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@CrossOrigin
	@ResponseBody
	@RequestMapping(value = "/musicas/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Long id) {
		BaseResponse response = new BaseResponse();

		try {
			this.musicaService.delete(id);
			response.setDataList(this.musicaService.findAll());
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Operação realizada com sucesso.");
		} catch (Exception e) {
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.ok(response);
	}

	@CrossOrigin
	@RequestMapping(value = "/musicas/artistas", method = RequestMethod.GET)
	public ResponseEntity<?> artistaList() {
		BaseResponse response = new BaseResponse();

		try {

			response.setDataList(this.artistaService.findAll());
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (BusinessException e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@CrossOrigin
	@RequestMapping(value = "/musicas/artistas", method = RequestMethod.POST)
	public ResponseEntity<?> saveArtista(@RequestBody Artista artista) {
		BaseResponse response = new BaseResponse();

		try {

			this.artistaService.save(artista);
			response.setDataList(this.artistaService.findAll());
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Operação realizada com sucesso.");

		} catch (Exception e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@CrossOrigin
	@ResponseBody
	@RequestMapping(value = "/musicas/artistas/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteArtista(@PathVariable("id") Long id) {
		BaseResponse response = new BaseResponse();

		try {
			this.artistaService.delete(id);
			response.setDataList(this.artistaService.findAll());
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Operação realizada com sucesso.");
		} catch (Exception e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.ok(response);
	}

}
